import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Code2, Mail, Database, Palette, Server, Sparkles, Menu, X, ExternalLink, Github } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [lastSubmit, setLastSubmit] = useState(0);
  const [honeypot, setHoneypot] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Update active section based on scroll position
      const sections = ["home", "skills", "projects", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Easter egg console
    console.log('%c⚔️ QUÊTE SECRÈTE DÉCOUVERTE! ⚔️', 'color: #9b87f5; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
    console.log('%cBravo, aventurier! Tu as découvert la quête cachée.', 'color: #f97316; font-size: 16px;');
    console.log('%cRésous cette énigme:', 'color: #9b87f5; font-size: 14px; font-weight: bold;');
    console.log('%c"Je suis le gardien des données, je stocke sans oublier. Organisé en lignes et colonnes, qui suis-je?"', 'color: #ffffff; font-size: 14px; font-style: italic;');
    console.log('%cEntre la réponse dans le champ "Message" du formulaire de contact avec le préfixe "QUÊTE:" pour débloquer un message secret!', 'color: #f97316; font-size: 12px;');
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check
    if (honeypot) {
      console.log('Bot detected');
      return;
    }
    
    // Rate limiting - max 1 submission per 30 seconds
    const now = Date.now();
    if (now - lastSubmit < 30000) {
      toast.error('Merci de patienter avant de soumettre à nouveau.');
      return;
    }
    
    // Easter egg check
    if (formData.message.toLowerCase().includes('quête:') && 
        formData.message.toLowerCase().includes('base de données')) {
      console.log('%c🎉 ÉNIGME RÉSOLUE! 🎉', 'color: #9b87f5; font-size: 20px; font-weight: bold;');
      console.log('%cFélicitations, maître aventurier! Tu as débloqué le secret:', 'color: #f97316; font-size: 14px;');
      console.log('%c"Le vrai trésor n\'était pas la destination, mais le code que nous avons écrit en chemin." 💎', 'color: #ffffff; font-size: 14px; font-style: italic;');
      toast.success('🎉 Énigme résolue! Vérifie la console pour ton message secret.');
    } else {
      toast.success("Message envoyé! Je reviendrai vers toi bientôt.");
    }
    
    setLastSubmit(now);
    setFormData({ name: "", email: "", message: "" });
  };

  const skills = [
    { name: "React", icon: Code2, size: "large", color: "from-accent to-accent/60" },
    { name: "TypeScript", icon: Code2, size: "large", color: "from-accent/80 to-accent/40" },
    { name: "Node.js", icon: Server, size: "medium", color: "from-accent to-accent/60" },
    { name: "REST APIs", icon: Server, size: "medium", color: "from-accent/80 to-accent/40" },
    { name: "UI/UX", icon: Palette, size: "large", color: "from-accent to-accent/60" },
    { name: "PostgreSQL", icon: Database, size: "medium", color: "from-accent/80 to-accent/40" },
    { name: "MongoDB", icon: Database, size: "small", color: "from-accent/60 to-accent/30" },
    { name: "Tailwind", icon: Palette, size: "medium", color: "from-accent to-accent/60" },
    { name: "Git", icon: Code2, size: "small", color: "from-accent/80 to-accent/40" },
    { name: "Docker", icon: Server, size: "small", color: "from-accent/60 to-accent/30" },
  ];

  const skillSizes = {
    large: "w-32 h-32 text-base",
    medium: "w-24 h-24 text-sm",
    small: "w-20 h-20 text-xs",
  };

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack marketplace with payment integration and real-time inventory management.",
      fullDescription: "Built a comprehensive e-commerce solution featuring user authentication, product catalog management, shopping cart functionality, and secure payment processing through Stripe. Implemented real-time inventory tracking and order management system with admin dashboard for business analytics.",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis"],
      features: ["Payment Integration", "Real-time Inventory", "Admin Dashboard", "Email Notifications"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Task Management App",
      description: "Collaborative project management tool with real-time updates and team workflows.",
      fullDescription: "Developed a robust project management platform with real-time collaboration features. Users can create projects, assign tasks, set deadlines, and track progress through customizable Kanban boards. Integrated WebSocket technology for instant updates across all team members.",
      tech: ["TypeScript", "WebSockets", "MongoDB", "Express", "Socket.io"],
      features: ["Real-time Collaboration", "Kanban Boards", "Team Management", "File Attachments"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Portfolio CMS",
      description: "Custom content management system for creative professionals to showcase their work.",
      fullDescription: "Created a modern CMS tailored for creative professionals with drag-and-drop interface, media library management, and customizable templates. Features include SEO optimization, responsive image handling, and static site generation for optimal performance.",
      tech: ["React", "Tailwind", "Supabase", "Next.js", "S3"],
      features: ["Drag & Drop Builder", "Media Library", "SEO Tools", "Template System"],
      demoUrl: "#",
      githubUrl: "#",
    },
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setNavOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-xl font-bold bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent"
            >
              Tanguy Osvald
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { id: 'home', label: 'Home' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors relative group ${
                    activeSection === item.id ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-accent transition-transform ${
                    activeSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="md:hidden p-2 text-foreground"
            >
              {navOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {navOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {[
                { id: 'home', label: 'Home' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeSection === item.id 
                      ? 'bg-accent/10 text-accent font-medium' 
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
      
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Parallax Background Elements */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div 
            className="absolute top-20 left-10 w-96 h-96 bg-primary/40 rounded-full blur-3xl"
            style={{ transform: `translate(${scrollY * 0.08}px, ${scrollY * 0.12}px)` }}
          />
          <div 
            className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/40 rounded-full blur-3xl"
            style={{ transform: `translate(${-scrollY * 0.06}px, ${-scrollY * 0.1}px)` }}
          />
          <div 
            className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent/30 rounded-full blur-3xl"
            style={{ transform: `translate(${scrollY * 0.05}px, ${scrollY * 0.08}px)` }}
          />
        </div>
        
        {/* Medieval pattern background */}
        <div 
          className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 45%, hsl(var(--accent) / 0.1) 45%, hsl(var(--accent) / 0.1) 55%, transparent 55%),
              linear-gradient(-45deg, transparent 45%, hsl(var(--accent) / 0.1) 45%, hsl(var(--accent) / 0.1) 55%, transparent 55%)
            `,
            backgroundSize: "60px 60px",
            transform: `translateY(${scrollY * 0.15}px)`,
          }} 
        />
        
        <div className="container relative z-10 mx-auto px-4 text-center animate-fade-in">
                    
          <div className="medieval-border inline-block px-12 py-8 mb-8">
            <h1 className="leading-tight pb-4 text-8xl md:text-8xl mb-2 font-bold bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
              Tanguy Osvald
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            Web Developer & Creative Technologist
          </p>
          
          <div className="ornate-divider max-w-md mx-auto my-8" />
          
          <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
            Transforming ideas into elegant digital solutions through innovative design and robust engineering.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              size="lg" 
              className="bg-accent text-accent-foreground hover:bg-accent/90 relative overflow-hidden group"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-accent text-accent hover:bg-accent/10"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 relative overflow-hidden">
        {/* Parallax Background Elements */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div 
            className="absolute top-10 right-20 w-72 h-72 bg-secondary/50 rounded-full blur-3xl"
            style={{ transform: `translate(${-scrollY * 0.07}px, ${scrollY * 0.1}px)` }}
          />
          <div 
            className="absolute bottom-20 left-20 w-80 h-80 bg-primary/50 rounded-full blur-3xl"
            style={{ transform: `translate(${scrollY * 0.06}px, ${-scrollY * 0.09}px)` }}
          />
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center mb-16">
            <div className="ornate-divider max-w-xs mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills & Expertise</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Full-stack development capabilities across modern technologies
            </p>
          </div>

          {/* Floating Skill Bubbles */}
          <div className="relative min-h-[500px] max-w-5xl mx-auto">
            <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-4 p-8">
              {skills.map((skill, index) => {
                const positions = [
                  { top: '10%', left: '15%' },
                  { top: '5%', left: '45%' },
                  { top: '15%', left: '75%' },
                  { top: '40%', left: '10%' },
                  { top: '35%', left: '40%' },
                  { top: '40%', left: '70%' },
                  { top: '65%', left: '20%' },
                  { top: '70%', left: '50%' },
                  { top: '65%', left: '80%' },
                  { top: '85%', left: '35%' },
                ];
                const pos = positions[index % positions.length];
                
                return (
                  <div
                    key={index}
                    className={`absolute ${skillSizes[skill.size as keyof typeof skillSizes]} rounded-full bg-gradient-to-br ${skill.color} backdrop-blur-sm border border-accent/30 flex flex-col items-center justify-center gap-2 p-4 hover:scale-110 hover:border-accent transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-accent/50`}
                    style={{
                      top: pos.top,
                      left: pos.left,
                      animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                      animationDelay: `${index * 0.2}s`,
                    }}
                  >
                    <skill.icon className="w-6 h-6 text-background group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-background text-center leading-tight">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 relative overflow-hidden">
        {/* Parallax Background Elements */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div 
            className="absolute top-20 left-10 w-96 h-96 bg-primary/50 rounded-full blur-3xl"
            style={{ transform: `translate(${scrollY * 0.05}px, ${scrollY * 0.09}px)` }}
          />
          <div 
            className="absolute bottom-10 right-10 w-72 h-72 bg-secondary/50 rounded-full blur-3xl"
            style={{ transform: `translate(${-scrollY * 0.07}px, ${-scrollY * 0.08}px)` }}
          />
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center mb-16">
            <div className="ornate-divider max-w-xs mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A selection of recent work showcasing different aspects of web development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className="relative group overflow-hidden bg-card border-border hover:border-accent transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedProject(index)}
              >
                {/* Ornate top border */}
                <div className="h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
                
                <div className="p-6">
                  {/* Icon with decorative frame */}
                  <div className="mb-4 relative inline-block">
                    <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center relative group-hover:bg-accent/20 transition-colors">
                      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-accent" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-accent" />
                      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-accent" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-accent" />
                      <Code2 className="w-8 h-8 text-accent relative z-10" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-muted text-xs rounded border border-border group-hover:border-accent transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-3 py-1 bg-muted text-xs rounded border border-border">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-accent/50 text-accent hover:bg-accent/10"
                  >
                    View Details
                  </Button>
                </div>
                
                {/* Bottom decorative element */}
                <div className="h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-accent">
          {selectedProject !== null && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <DialogTitle className="text-3xl font-bold mb-2">
                      {projects[selectedProject].title}
                    </DialogTitle>
                    <p className="text-muted-foreground">
                      {projects[selectedProject].description}
                    </p>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-6 mt-6">
                {/* Full Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent" />
                    Overview
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {projects[selectedProject].fullDescription}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {projects[selectedProject].features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {projects[selectedProject].tech.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-4 py-2 bg-accent/10 text-sm rounded-lg border border-accent/30 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button 
                    className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={() => window.open(projects[selectedProject].demoUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1 border-accent text-accent hover:bg-accent/10"
                    onClick={() => window.open(projects[selectedProject].githubUrl, '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        {/* Parallax Background Elements */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div 
            className="absolute top-10 left-1/4 w-80 h-80 bg-accent/50 rounded-full blur-3xl"
            style={{ transform: `translate(${scrollY * 0.04}px, ${scrollY * 0.07}px)` }}
          />
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center mb-16">
            <div className="ornate-divider max-w-xs mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Connect</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? I'd love to hear about it and discuss how we can work together
            </p>
          </div>

          <Card className="max-w-2xl mx-auto relative overflow-hidden bg-card border-border">
            {/* Decorative top border */}
            <div className="h-2 bg-gradient-to-r from-accent via-accent/50 to-accent" />
            
            <div className="p-8 relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field - hidden from users */}
                <div style={{ position: 'absolute', left: '-9999px' }}>
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Votre nom
                  </label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background border-border focus:border-accent"
                    required
                    minLength={2}
                    maxLength={100}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Adresse email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-background border-border focus:border-accent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Votre message
                    <span className="text-xs text-muted-foreground ml-2">(Psst... as-tu trouvé la quête secrète?)</span>
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-background border-border focus:border-accent min-h-[150px]"
                    required
                    minLength={10}
                    maxLength={1000}
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    Envoyer le message
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border relative">
        <div className="ornate-divider max-w-md mx-auto mb-6" />
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2026 Tanguy Osvald. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
