import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Eye, EyeOff, AlertCircle, Lock, Mail } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) return setError("Email address is required.");
    if (!password) return setError("Password is required.");
    if (!/\S+@\S+\.\S+/.test(email)) return setError("Please enter a valid email address.");

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800)); // simulate

    const success = login(email, password);
    if (success) {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Use: admin@crms.gov.in / Admin@123");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, #94A9C4 40px, #94A9C4 41px),
            repeating-linear-gradient(90deg, transparent, transparent 40px, #94A9C4 40px, #94A9C4 41px)`
        }}
      />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-crimson-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-crimson-500/10 border border-crimson-500/30 rounded-2xl mb-4">
            <Shield size={32} className="text-crimson-400" />
          </div>
          <h1 className="font-heading font-bold text-4xl text-white tracking-wider">CRMS</h1>
          <p className="text-steel-400 text-sm mt-1 uppercase tracking-widest">Crime Record Management System</p>
          <div className="mt-3 h-px bg-gradient-to-r from-transparent via-crimson-500/40 to-transparent" />
        </div>

        {/* Card */}
        <div className="bg-navy-900/80 backdrop-blur-sm border border-navy-700 rounded-2xl p-8 shadow-2xl">
          <h2 className="font-heading font-semibold text-xl text-white mb-1">Officer Sign In</h2>
          <p className="text-steel-400 text-sm mb-6">Authorized personnel only</p>

          {error && (
            <div className="flex items-start gap-2.5 bg-crimson-500/10 border border-crimson-500/30 rounded-lg px-4 py-3 mb-5">
              <AlertCircle size={15} className="text-crimson-400 mt-0.5 flex-shrink-0" />
              <p className="text-crimson-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="form-label">Email Address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-steel-400" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input pl-10"
                  placeholder="officer@crms.gov.in"
                />
              </div>
            </div>

            <div>
              <label className="form-label">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-steel-400" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input pl-10 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-steel-400 hover:text-steel-200 transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3 mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Shield size={15} />
                  Sign In to Portal
                </>
              )}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-5 p-3 bg-navy-800/60 rounded-lg border border-navy-700">
            <p className="text-steel-400 text-[11px] uppercase tracking-wider font-semibold mb-1.5">Demo Credentials</p>
            <p className="text-steel-300 text-xs font-mono">admin@crms.gov.in</p>
            <p className="text-steel-300 text-xs font-mono">Admin@123</p>
          </div>
        </div>

        <p className="text-center text-steel-400/50 text-xs mt-6">
          Chandigarh Police Department · Secure Portal v2.4
        </p>
      </div>
    </div>
  );
};

export default Login;
