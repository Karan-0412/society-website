import { User, PasswordResetLog, sequelize } from '../models/index.js';
import { validationResult } from 'express-validator';
import { Op } from 'sequelize';
import * as emailService from '../services/emailService.js';
import * as passwordService from '../services/passwordService.js';
import * as logService from '../services/logService.js';
import { generateResetToken } from '../utils/helpers.js';

const forgotPassword = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { email } = req.body;

    // Find user
    const user = await User.findOne({
      where: { email, status: { [Op.in]: ['active', 'inactive'] } },
      transaction
    });

    if (!user) {
      await logService.logPasswordReset(null, email, 'reset_requested', req, false, 'User not found');
      return res.status(200).json({
        success: true,
        message: 'If an account with that email exists, we\'ve sent a password reset link.'
      });
    }

    // Generate and save reset token
    const resetToken = generateResetToken();
    const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await user.update({
      reset_token: resetToken,
      reset_token_expiry: tokenExpiry
    }, { transaction });

    await logService.logPasswordReset(user.id, email, 'reset_requested', req, true);
    await transaction.commit();

    // Send email
    await emailService.sendResetEmail(email, user.name, resetToken);

    res.status(200).json({
      success: true,
      message: 'If an account with that email exists, we\'ve sent a password reset link.'
    });

  } catch (error) {
    await transaction.rollback();
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request.'
    });
  }
};

const verifyResetToken = async (req, res) => {
  try {
    const { token, email } = req.body;

    const user = await User.findOne({
      where: {
        email,
        reset_token: token,
        reset_token_expiry: { [Op.gt]: new Date() }
      }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Reset token is valid'
    });

  } catch (error) {
    console.error('Verify token error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while verifying the token.'
    });
  }
};

const resetPassword = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { token, email, password } = req.body;

    // Validate password strength
    const passwordValidation = passwordService.validatePasswordStrength(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Password does not meet requirements',
        errors: passwordValidation.errors
      });
    }

    // Find user with valid token
    const user = await User.findOne({
      where: {
        email,
        reset_token: token,
        reset_token_expiry: { [Op.gt]: new Date() }
      },
      transaction
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token.'
      });
    }

    // Update password
    await user.update({
      password: password, // Will be hashed by model hook
      reset_token: null,
      reset_token_expiry: null
    }, { transaction });

    await logService.logPasswordReset(user.id, email, 'password_reset', req, true);
    await transaction.commit();

    // Send confirmation email
    await emailService.sendConfirmationEmail(email, user.name);

    res.status(200).json({
      success: true,
      message: 'Password has been reset successfully.'
    });

  } catch (error) {
    await transaction.rollback();
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while resetting your password.'
    });
  }
};

export {
  forgotPassword,
  verifyResetToken,
  resetPassword
};
