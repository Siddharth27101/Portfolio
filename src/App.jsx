import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Float, Environment, PerspectiveCamera, Stars, Text3D, Center } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Brain, Cpu, Code, Award, Briefcase, GraduationCap, MapPin, Calendar, ChevronDown } from 'lucide-react';

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

  const projects = [
    {
      title: "Water Quality Analysis & Prediction",
      description: "A data science project to analyze and predict water quality using Python and Kaggle datasets.",
      tech: ["Python", "Kaggle", "Data Science"],
      icon: <Brain className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-600",
      github: "#",
      demo: "#"
    },
    {
      title: "Wellness Buddy App",
      description: "A full-stack wellness platform helping users track their habits, health, and goals with an interactive dashboard.",
      tech: ["React.js", "JavaScript", "Python", "SQL"],
      icon: <Code className="w-6 h-6" />,
      color: "from-green-500 to-emerald-600",
      github: "#",
      demo: "https://frontend-vd6p.vercel.app/"
    }
  ];

  const skills = [
    { name: "Java", level: 90, color: "#f89820" },
    { name: "Python", level: 70, color: "#3776ab" },
    { name: "SQL", level: 80, color: "#00618a" },
    { name: "JavaScript", level: 60, color: "#f7df1e" },
    { name: "React.js", level: 60, color: "#61dafb" },
    { name: "Machine Learning", level: 75, color: "#ff6b6b" },
    { name: "Data Science", level: 80, color: "#00d4aa" }
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

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div style={{ y: y1 }} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="backdrop-blur-md bg-black/20 p-12 rounded-2xl border border-white/10 max-w-4xl">
          <motion.h1 className="text-5xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.8 }}>
            Sai Siddhartha Bobbili
          </motion.h1>
          <motion.p className="text-2xl md:text-3xl mb-4 text-gray-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}>
            B.Tech Student | CSE-DATA SCIENCE
          </motion.p>
          <motion.p className="text-lg mb-8 text-gray-400 max-w-2xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.4 }}>
            Passionate about AI/ML, Computer Vision, and creating innovative solutions that bridge technology and real-world problems.
          </motion.p>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-7xl mx-auto w-full">
          <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
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
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl font-bold" style={{ backgroundColor: skill.color }}>
                    {skill.name.charAt(0)}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{skill.name}</h3>
                  <div className="h-2 w-full bg-white/20 rounded-full">
                    <div className="h-2 rounded-full" style={{ width: `${skill.level}%`, backgroundColor: skill.color }}></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
