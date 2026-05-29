import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

// 1. Define our validation rules using Zod
const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" })
});

const Login = () => {
    const navigate = useNavigate();
    const setUser = useAuthStore(state => state.setUser);

    // 2. Initialize React Hook Form
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginSchema)
    });

    // 3. Handle the actual API call
    const onSubmit = async (data) => {
        try {
            const res = await axios.post('/api/auth/login', data);
            
            // Save user to global state
            setUser(res.data);
            toast.success(`Welcome back, ${res.data.name}!`);
            
            // Redirect to the home page (or dashboard)
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid email or password');
        }
    };

    return (
        <section className="mt-60 mb-80 flex-center">
            <div style={{ maxWidth: '400px', width: '100%', padding: '30px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                <h2 className="text-center mb-80" style={{ marginBottom: '20px' }}>Sign In</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email Address</label>
                        <input 
                            type="email" 
                            {...register('email')} 
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                        {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email.message}</span>}
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password</label>
                        <input 
                            type="password" 
                            {...register('password')} 
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                        {errors.password && <span style={{ color: 'red', fontSize: '12px' }}>{errors.password.message}</span>}
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        style={{ width: '100%', padding: '12px', background: 'var(--primary-orange, #f57224)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="text-center" style={{ marginTop: '20px', fontSize: '14px' }}>
                    Don't have an account? <Link to="/register" style={{ color: 'var(--primary-orange, #f57224)', fontWeight: 'bold' }}>Register here</Link>
                </p>
            </div>
        </section>
    );
};

export default Login;