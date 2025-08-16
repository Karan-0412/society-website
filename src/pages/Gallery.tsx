import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Gallery = () => {
  // Placeholder images - in a real implementation, these would come from your content management system
  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop",
      alt: "Students collaborating in workshop",
      category: "Workshop"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop",
      alt: "Tech conference presentation",
      category: "Conference"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop",
      alt: "Team building activities",
      category: "Social"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
      alt: "Community outreach program",
      category: "Community"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop",
      alt: "Innovation showcase",
      category: "Innovation"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop",
      alt: "Leadership summit",
      category: "Leadership"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="hero-gradient text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Gallery
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Capturing moments of growth, collaboration, and achievement in our vibrant community.
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-smooth"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-smooth"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                  <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-smooth opacity-0 group-hover:opacity-100">
                    <div className="text-sm font-medium">{image.category}</div>
                    <div className="text-xs opacity-90">{image.alt}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Featured Videos</h2>
              <p className="text-muted-foreground">
                Watch highlights from our recent events and activities.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <div className="text-4xl mb-2">📹</div>
                  <div>Annual Conference Highlights</div>
                  <div className="text-sm">Coming Soon</div>
                </div>
              </div>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <div className="text-4xl mb-2">🎬</div>
                  <div>Student Success Stories</div>
                  <div className="text-sm">Coming Soon</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;