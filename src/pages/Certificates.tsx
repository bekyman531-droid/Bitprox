import { motion } from 'motion/react';
import { Award, ShieldCheck, FileText } from 'lucide-react';

export function Certificates() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 flex flex-col">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
          Official <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Certificates</span>
        </h1>
        <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto">
          BitProx is a fully registered and regulated investment platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          whileHover={{ scale: 1.02, y: -5, rotateX: 5, rotateY: -5 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 300 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="group relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" style={{ transform: 'translateZ(-20px)' }} />
          <div className="relative bg-gradient-to-br from-black/80 to-black/40 border-t border-l border-white/20 border-r border-b border-white/5 rounded-3xl p-8 backdrop-blur-xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-bl-full" />
            <div style={{ transform: 'translateZ(30px)' }}>
              <Award className="w-16 h-16 text-cyan-400 mb-6 relative z-10" />
              <h3 className="text-2xl font-black text-white mb-4 relative z-10">Certificate of Incorporation</h3>
              <p className="text-gray-400 mb-6 relative z-10">
                BitProx Ltd. is officially registered in the United Kingdom under company number 14592834.
              </p>
              <div className="w-full h-64 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center relative z-10 hover:bg-white/10 transition-colors cursor-pointer shadow-inner">
                <FileText className="w-12 h-12 text-gray-500" />
                <span className="absolute bottom-4 text-sm text-gray-400 font-bold">Click to view document</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          whileHover={{ scale: 1.02, y: -5, rotateX: 5, rotateY: 5 }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 300 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="group relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" style={{ transform: 'translateZ(-20px)' }} />
          <div className="relative bg-gradient-to-br from-black/80 to-black/40 border-t border-l border-white/20 border-r border-b border-white/5 rounded-3xl p-8 backdrop-blur-xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full" />
            <div style={{ transform: 'translateZ(30px)' }}>
              <ShieldCheck className="w-16 h-16 text-blue-400 mb-6 relative z-10" />
              <h3 className="text-2xl font-black text-white mb-4 relative z-10">Financial Conduct Authority</h3>
              <p className="text-gray-400 mb-6 relative z-10">
                Fully compliant with international financial regulations and AML directives.
              </p>
              <div className="w-full h-64 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center relative z-10 hover:bg-white/10 transition-colors cursor-pointer shadow-inner">
                <FileText className="w-12 h-12 text-gray-500" />
                <span className="absolute bottom-4 text-sm text-gray-400 font-bold">Click to view document</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
