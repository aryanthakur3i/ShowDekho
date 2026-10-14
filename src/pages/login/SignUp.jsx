import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function SignUp() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const[showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");


    function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setMessage("");


        if (
            !name.trim() ||
            !email.trim() ||
            !mobile.trim() ||
            !password ||
            !confirmPassword
        ) {
            setError("Please fill in all fields.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {


            setError("Please Enter a valid email address.")
            return;
        }
        if (!/^[6-9]\d{9}$/.test(mobile)) {
            setError("Please enter a valid 10-digit mobile number.");
            return;
        }
        if (password.length < 6) {
            setError("Password must contain at least 6 characters.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }


        //DEMO AUTHENTICATION ONLY

        const users = JSON.parse(
            localStorage.getItem("showDekhoUsers") || "[]"
        );

        const alreadyRegistered = users.some(
            (user) =>
                user.email.toLowerCase() ===
                email.trim().toLowerCase() ||
                user.mobile === mobile
        );

        if (alreadyRegistered) {
            setError("This email or mobile nummber is already registered.");
            return;
        }
        const newUser = {
            name: name.trim(),
            email:
                email.trim().toLowerCase(),
            mobile: mobile,
            password: password
        };


        users.push(newUser);

        localStorage.setItem(
            "showDekhoUsers",
            JSON.stringify(users)
        );
        setMessage("Account created successfully! Redirecting to login....");

        setTimeout(() => {
            navigate("/login");
        }, 1500);
    }
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#100d16] px-4 py-10 text-white">
            <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl sm:p-10">

                <Link to="/" className="text-3xl font-black tracking-tight">
                    Show<span className="text-[#f84464]">Dekho</span>
                </Link>

                <h1 className="mt-8 text-3xl font-extrabold">
                    Create account<span className="text-[#f84464]">.</span>

                </h1>
                <p className="mt-3 mb-8 text-sm text-gray-400">
                    Join ShowDekho and discover your next experience.

                </p>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-5">
                        <label htmlFor="signup-name" className="mb-2 block text-sm font-medium">Full name</label>
                        <input id="signup-name"
                            type="text"
                            autoComplete="name"
                            value={name} onChange={(event) => setName(event.target.value)}
                            placeholder="Enter your full name"
                            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-4 text-sm outline-none focus:border-[#f84464]" />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="signup-email" className="mb-2 block text-sm font-medium">Email address</label>
                        <input id="signup-email"
                            type="email"
                            autoComplete="email"
                            value={email} onChange={(event) => setEmail(event.target.value)}
                            placeholder="your@example.com"
                            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-4 text-sm outline-none focus:border-[#f84464]" />

                    </div>


                    <div className="mb-5">
                        <label htmlFor="signup-mobile" className="mb-2 block text-sm font-medium">Mobile Number

                        </label>
                        <div className="flex items-center rounded-xl border border-white/10 bg-black/20 px-4 focus-within:border-[#f84464]">

                            <span className="border-r border-white/10 py-4 pr-3 text-sm text-gray-400">+91</span>
                            <input id="signup-mobile"
                                type="tel"
                                inputMode="numeric"
                                autoComplete="tel-national"
                                maxLength={10}
                                value={mobile}
                                onChange={(event) => setMobile(event.target.value.replace(/\D/g, "").slice(0, 10))}
                                placeholder="10-digit mobile number"
                                className="w-full min-w-0 bg-transparent py-4 pl-3 text-sm outline-none" />

                        </div>

                    </div>

                    <div className="mb-5">
                        <label htmlFor="signup-password" className="mb-2 block text-sm font-medium">Password</label>

                        <div className="flex items-center rounded-xl border border-white/10 bg-black/20 px-4 focus-within:border-[#f84464]">
                            <input id="signup-password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="At least 6 characters"
                                className="w-full min-w-0 flex-1 bg-transparent py-4 text-sm outline-none" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "show password"}
                                className="ml-3 shrink-0 text-xs font-semibold text-pink-300 hover:text-white">
                                {showPassword ? "Hide" : "Show"}
                            </button>

                        </div>
                    </div>


                    <div className="mb-6">
                        <label htmlFor="signup-confirm-password" className="mb-2 block text-sm font-medium">Confirm password</label>
                        <div className="flex items-center rounded-xl border border-white/10 bg-black/20 px-4 focus-within:border-[#f84464]">
                            <input id="signup-confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                autoComplete="new-password"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                placeholder="Re-enter your password"
                                className="w-full min-w-0 flex-1 bg-transparent py-4 text-sm outline-none" />
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                aria-label={showConfirmPassword ? "HIDE" : "SHOW"}
                                className="ml-3 shrink-0 text-xs font-semibold text-pink-300 hover:text-white">

                                    {showConfirmPassword ? "HIDE" : "SHOW"}


                            </button>
                        </div>

                    </div>

                    {error && (
                        <p role="alert" className="mb-5 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>
                    )}
                    {message && (
                        <p role="status" className="mb-5 rounded-xl bg-green-500/10 px-4 py-3 text-sm text-green-300">{message}</p>
                    )}
                    <button type="submit"
                        className="w-full rounded-xl bg-gradient-to-r from-[#f84464] to-[#e92d76] px-5 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5
                hover:shadow-pink-900/40">Create Account</button>

                </form>



                <p className="mt-7 text-center text-sm text-gray-400">Already have an account?{" "}
                    <Link to="/login" className="font-bold text-[#ff6b91] hover:text-white">Sign in</Link>
                </p>

            </div>
        </main>
    );




}
export default SignUp;