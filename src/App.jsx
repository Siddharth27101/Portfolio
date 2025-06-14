import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Float, Environment, PerspectiveCamera, Stars, Text3D, Center } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Download, Code, Brain, Cpu, Award, Briefcase, GraduationCap, MapPin, Calendar, ExternalLink, ChevronDown } from 'lucide-react';

// 3D Floating Card Component
const FloatingCard = ({ position, children, ...props }) => {
  const meshRef = useRef(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
      <Box ref={meshRef} position={position} args={[4, 2.5, 0.2]} {...props}>
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
      </Box>
    </Float>
  );
};

// Animated 3D Text
const AnimatedText3D = ({ text, position }) => {
  const textRef = useRef(null);
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });
  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <Center position={position}>
        <Text3D
          ref={textRef}
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.5}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          {text}
          <meshStandardMaterial color="#00ff88" />
        </Text3D>
      </Center>
    </Float>
  );
};

const Scene3D = () => (
  <>
    <PerspectiveCamera makeDefault position={[0, 0, 10]} />
    <OrbitControls enablePan={false} enableZoom={false} enableRotate autoRotate autoRotateSpeed={0.5} />
    <ambientLight intensity={0.3} />
    <pointLight position={[10, 10, 10]} intensity={1} />
    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ff88" />
    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <Sphere position={[-8, 3, -5]} args={[0.5]}>
        <meshStandardMaterial color="#00ff88" roughness={0.2} metalness={0.8} />
      </Sphere>
    </Float>
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.7}>
      <Box position={[8, -2, -3]} args={[1, 1, 1]}>
        <meshStandardMaterial color="#ff0088" roughness={0.3} metalness={0.7} />
      </Box>
    </Float>
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.4}>
      <Sphere position={[0, 5, -8]} args={[0.8]}>
        <meshStandardMaterial color="#0088ff" roughness={0.1} metalness={0.9} />
      </Sphere>
    </Float>

    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <Box position={[-6, -4, -2]} args={[0.8, 0.8, 0.8]}>
        <meshStandardMaterial color="#61dafb" roughness={0.2} metalness={0.8} />
      </Box>
    </Float>
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.5}>
      <Sphere position={[6, 4, -4]} args={[0.6]}>
        <meshStandardMaterial color="#f7df1e" roughness={0.1} metalness={0.9} />
      </Sphere>
    </Float>

    <Environment preset="night" />
  </>
);

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);

  const projects = [
    {
      title: "Gesture Controlled YouTube Player",
      description: "Advanced hand gesture recognition system using OpenCV, MediaPipe, and PyAutoGUI for intuitive YouTube control.",
      tech: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI"],
      icon: <Code className="w-6 h-6" />,
      color: "from-blue-500 to-purple-600",
      github: "https://github.com/your-github/gesture-youtube",
      demo: "https://your-demo-link.com"
    },
    {
      title: "Loan Prediction ML Model",
      description: "Machine learning model with 89% accuracy for loan approval prediction using ensemble methods.",
      tech: ["Python", "Scikit-Learn", "Pandas", "NumPy"],
      icon: <Brain className="w-6 h-6" />,
      color: "from-green-500 to-teal-600",
      github: "https://github.com/your-github/loan-prediction",
      demo: "https://your-demo-link.com"
    },
    {
      title: "Real-time Face Detection App",
      description: "High-performance face detection system using Haar Cascades with real-time video processing.",
      tech: ["Python", "OpenCV", "Tkinter", "NumPy"],
      icon: <Cpu className="w-6 h-6" />,
      color: "from-red-500 to-orange-600",
      github: "https://github.com/your-github/face-detection",
      demo: "https://your-demo-link.com"
    }
  ];

  const skills = [
    { name: "Python", level: 90, color: "#3776ab" },
    { name: "JavaScript", level: 85, color: "#f7df1e" },
    { name: "React.js", level: 80, color: "#61dafb" },
    { name: "Machine Learning", level: 75, color: "#ff6b6b" },
    { name: "OpenCV", level: 85, color: "#5c3ee8" },
    { name: "Data Science", level: 80, color: "#00d4aa" },
    { name: "Node.js", level: 70, color: "#68a063" },
    { name: "MongoDB", level: 75, color: "#4db33d" }
  ];

  const experience = [
    {
      title: "Intern",
      company: "Ekalavya Solutions",
      period: "May 2025 - June 2025",
      description: "Worked as an intern, contributing to real-world projects and gaining hands-on experience in software development. Focused on machine learning with Python.",
      skills: ["Python", "Machine Learning", "Software Development", "Team Collaboration"]
    }
  ];

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Fixed 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas>
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </Canvas>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            Portfolio
          </motion.div>
          <div className="hidden md:flex gap-8">
            {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize transition-all duration-300 hover:text-blue-400 ${
                  activeSection === item ? 'text-blue-400' : 'text-gray-300'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="relative z-10">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center px-6">
          <motion.div 
            style={{ y: y1 }}
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, delay: 0.5 }}
            className="backdrop-blur-md bg-black/20 p-12 rounded-2xl border border-white/10 max-w-4xl"
          >
            <motion.h1 
              className="text-5xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.5 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 1, delay: 0.8 }}
            >
              Sai Siddhartha Bobbili
            </motion.h1>
            <motion.p 
              className="text-2xl md:text-3xl mb-4 text-gray-300" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              B.Tech Student | CSE-DATA SCIENCE
            </motion.p>
            <motion.p 
              className="text-lg mb-8 text-gray-400 max-w-2xl mx-auto" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              Passionate about AI/ML, Computer Vision, and creating innovative solutions that bridge technology and real-world problems.
            </motion.p>
            <motion.div 
              className="flex gap-6 justify-center mb-8" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <a 
                href="https://www.linkedin.com/in/sai-siddhartha-bobbili-04a893328" 
                target="_blank" 
                rel="noreferrer"
                className="p-4 rounded-full bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-7 h-7" />
              </a>
              <a 
                href="https://github.com/your-github" 
                target="_blank" 
                rel="noreferrer"
                className="p-4 rounded-full bg-gray-600/20 hover:bg-gray-600/40 border border-gray-500/30 transition-all duration-300 hover:scale-110"
              >
                <Github className="w-7 h-7" />
              </a>
              <a 
                href="mailto:siddharthbobbili.jcl@gmail.com"
                className="p-4 rounded-full bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 transition-all duration-300 hover:scale-110"
              >
                <Mail className="w-7 h-7" />
              </a>
            </motion.div>
            <motion.button
              onClick={() => scrollToSection('about')}
              className="animate-bounce p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen flex items-center px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className="backdrop-blur-md bg-black/30 p-8 rounded-2xl border border-white/10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  About Me
                </h2>
                <div className="space-y-4 text-gray-300">
                  <p className="text-lg leading-relaxed">
                    I'm a passionate B.Tech Computer Science student specializing in Data Science, with a keen interest in AI/ML and computer vision technologies.
                  </p>
                  <p className="text-lg leading-relaxed">
                    My journey in tech started with curiosity about how machines can "see" and understand the world. This led me to explore computer vision, machine learning, and gesture recognition systems.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-blue-400" />
                      <span>Hyderabad, India</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-5 h-5 text-green-400" />
                      <span>B.Tech CSE-DS</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-purple-400" />
                      <span>Expected 2026</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-orange-400" />
                      <span>AI/ML Enthusiast</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="backdrop-blur-md bg-black/30 p-8 rounded-2xl border border-white/10">
                <h3 className="text-2xl font-bold mb-6 text-blue-400">What I Do</h3>
                <div className="space-y-6">
                  {[ 
                    { icon: <Brain className="w-6 h-6" />, title: "Machine Learning", desc: "Building predictive models and AI solutions" },
                    { icon: <Cpu className="w-6 h-6" />, title: "Computer Vision", desc: "Developing image processing and recognition systems" },
                    { icon: <Code className="w-6 h-6" />, title: "Web Development", desc: "Creating modern, responsive web applications" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10"
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                    >
                      <div className="text-blue-400">{item.icon}</div>
                      <div>
                        <h4 className="font-semibold text-white">{item.title}</h4>
                        <p className="text-gray-400">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen flex items-center px-6 py-20">
          <div className="max-w-7xl mx-auto w-full">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
            >
              Technical Skills
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="backdrop-blur-md bg-black/30 p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-center">
                    <div 
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl font-bold"
                      style={{ backgroundColor: skill.color }}
                    >
                      {skill.name.charAt(0)}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{skill.name}</h3>
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                    <span className="text-sm text-gray-400">{skill.level}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen flex items-center px-6 py-20">
          <div className="max-w-7xl mx-auto w-full">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              Featured Projects
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="backdrop-blur-md bg-black/30 p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${project.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    {project.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-white/10 rounded-md text-xs text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors text-sm"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-blue-600/50 hover:bg-blue-600 rounded-lg transition-colors text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="min-h-screen flex items-center px-6 py-20">
          <div className="max-w-4xl mx-auto w-full">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"
            >
              Experience
            </motion.h2>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="backdrop-blur-md bg-black/30 p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                      <p className="text-blue-400 mb-2">{exp.company}</p>
                      <p className="text-gray-400 text-sm mb-4">{exp.period}</p>
                      <p className="text-gray-300 mb-4">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <span key={skill} className="px-2 py-1 bg-white/10 rounded-md text-xs text-gray-300">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center px-6 py-20">
          <div className="max-w-4xl mx-auto w-full text-center">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent"
            >
              Let's Work Together
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
            >
              I'm always interested in new opportunities and exciting projects. Let's connect and create something amazing!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="backdrop-blur-md bg-black/30 p-8 rounded-2xl border border-white/10 max-w-md mx-auto"
            >
              <div className="space-y-6">
                <a
                  href="mailto:siddharthbobbili.jcl@gmail.com"
                  className="flex items-center justify-center gap-3 p-4 bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <Mail className="w-6 h-6" />
                  <span>siddharthbobbili.jcl@gmail.com</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/sai-siddhartha-bobbili-04a893328"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-3 p-4 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <Linkedin className="w-6 h-6" />
                  <span>LinkedIn Profile</span>
                </a>
                <button className="w-full flex items-center justify-center gap-3 p-4 bg-green-600/20 hover:bg-green-600/40 border border-green-500/30 rounded-lg transition-all duration-300 hover:scale-105">
                  <Download className="w-6 h-6" />
                  <span>Download Resume</span>
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
