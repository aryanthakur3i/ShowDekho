import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
    const navigate = useNavigate();

    const [loginMethod, setLoginMethod] = useState("email");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");




    function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setMessage("");

        //STEP 1: VALIDATE EMAIL 
        if (loginMethod === "email") {
            if (!email.trim()) {
                setError("Please enter your email address.");
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setError("Please enter a valid email address.");
                return;
            }
        }

        //STEP:2 VALIDATE MOBILE NUMBER

        if (loginMethod === "mobile") {
            if (!/^[6-9]\d{9}$/.test(mobile)) {
                setError("Please enter a valid 10-digit mobile number.");
                return;
            }
        }

        //PASSWORD VALIDATION-EMAIL & MOBILE BOTH

        if (!password) {
            setError("Please enter your password.");
            return;
        }

        if (password.length < 6) {
            setError("Password must contain at least 6 characters.");
            return;
        }
        //STEP:3 GET REGISTERED DEMO USERS 
        let users;

        try {
            users = JSON.parse(
                localStorage.getItem("showDekhoUsers") || "[]"

            );
        } catch {
            setError("Unable to read account data. Please try again.");
            return;
        }

        //STEP: 4 FIND THE REGISTERED ACCOUNT 
        const currentUser = users.find((user) => {
            if (loginMethod === "email") {
                return (
                    user.email?.toLowerCase() === email.trim().toLowerCase()
                );
            }
            return user.mobile === mobile;
        });

        //STEP:5 CHECK ACCOUNT AND PASSWORD
        if (!currentUser) {
            setError("Account not found. Please create an account first.");
            return;

        }
        if (currentUser.password !== password) {
            setError("Incorrect password. Please try again.");
            return;
        }
        //STEP:6 SAVE DEMO LOGIN SESSION 
        const { password:
            savedPassword, ...userWithoutPassword } = currentUser;

        try {
            const sessionData = JSON.stringify(userWithoutPassword);
            if (rememberMe) {
                localStorage.setItem("showDekhoCurrentUser", sessionData);

                sessionStorage.removeItem("showDekhoCurrentUser");
            } else {
                sessionStorage.setItem("showDekhoCurrentUser", sessionData);
                localStorage.removeItem("showDekhoCurrentUser");
            }
        } catch {
            setError("Unable to complete login. Please try again.");
            return;
        }

        //STEP:7 SHOW SUCCESS MESSAGE 
        setMessage("Login successful! your account is verified.");

    }


        function changeLoginMethod(method) {

            setLoginMethod(method);
            setError("");
            setMessage("");

        }
    









    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#100d16] px-4 py-10 text-white">

            {/* BACKGROUND DECORATION  */}

            <div aria-hidden="true" className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-pink-600/20 blur-[100px]" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -right-32 h-[450px] w-[450px] rounded-full bg-purple-600/20 blur-[120px]" />




            {/* LOGIN CONTAINER */}
            <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40 backdrop-blur-xl md:grid-cols-2">

                {/* LEFT: BRAND PANEL */}

                <section className="relative hidden min-h-[650px] flex-col justify-between overflow-hidden bg-gradient-to-br from-[#f84464] via-[#a51b62] to-[#42154f] p-10 md:flex lg:p-12">

                    <div aria-hidden="true" className="absolute -right-20 top-24 h-64 w-64 rounded-full border-[35px] border-white/10" />
                    <div aria-hidden="true" className="absolute -bottomm-24 -left-16 h-72 w-72 rounded-full border-[45px] border-white/10" />

                    <div className="relative z-10">
                        <Link to="/" className="inline-block text-3xl font-black tracking-tight">
                            Show<span className="text-pink-200">Dekho</span>
                        </Link>

                        <div className="mt-20">
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]">

                                <span className="h-2 w-2 rounded-full border bg-green-300" />
                                Your entertainment hub

                            </span>

                            <h1 className="mt-7 text-4xl font-extrabold leading-tight lg:text-5xl">
                                Your next<br />great experience<br /><span className="text-pink-200">starts here.</span>

                            </h1>

                            <p className="mt-6 max-w-sm text-base leading-7 text-white/80">
                                Discover movies, explore live events and make unforgettable memories. The show starts with you!

                            </p>


                        </div>

                    </div>



                    <div className="relative z-10 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">

                        <div className="flex items-center gap-1 text-yellow-300">
                            <span>★</span>
                            <span>★</span>
                            <span>★</span>
                            <span>★</span>
                            <span>★</span>

                        </div>

                        <p className="mt-3 text-sm leading-6 text-white/90">
                            "Find your next favourite movie, plan a night out and turn ordinary days into memorable experiences."
                        </p>

                        <p className="mt-3 text-xs font-semibold text-white/70">
                            YOUR ENTERTAINMENT. YOUR WAY.

                        </p>

                    </div>

                </section>


                {/* RIGHT LOGIN FORM */}

                <section className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">

                    {/* MOBILE LOGO */}

                    <Link to="/" className="mb-8 inline-block text-center text-3xl font-black tracking-tight md:hidden">

                        Show<span className="text-[#f84464]">Dekho</span>

                    </Link>

                    <div className="mb-8">
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#ff6b91]"> Welcome back</p>
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Sign in<span className="text-[#f84464]">.</span></h2>
                        <p className="mt-3 text-sm leading-6 text-gray-400">Enter your details to continue your entertainment journey.</p>
                    </div>


                    {/* LOGIN METHODS TAB */}


                    <div className="mb-7 grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-black/20 p-1.5">

                        <button type="button" onClick={() => changeLoginMethod("email")}
                            className={`rounded-lg px-4 py-3 text-sm font-semibold transition duration-200 ${loginMethod === "email" ?
                                "bg-gradient-to-r from-[#f84464] to-[#e92d76] text-white shadow-lg shadow-pink-900/30" :
                                "text-gray-400 hover:bg-white/5 hover:text-white"}`}>✉ Email

                        </button>

                        <button type="button"
                            onClick={() => changeLoginMethod("mobile")}
                            className={`rounded-lg px-4 py-3 text-sm font-semibold transition duration-200
                        ${loginMethod === "mobile" ? "bg-gradient-to-r from-[#f84464] to-[#e92d76] text-white shadow-lg shadow-pink-900/30"
                                    : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>☎ Mobile</button>

                    </div>

                    <form onSubmit={handleSubmit} noValidate>


                        {/* EMAIL INPUT */}

                        {loginMethod === "email" ? (<div className="mb-5">
                            <label htmlFor="login-email" className="mb-2 block text-sm font-medium text-gray-200">Email address

                            </label>


                            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 transition focus-within:border-[#f84464] 
                            focus-within:ring-2 focus-within:ring-pink-500/20">
                                <span aria-hidden="true" className="text-lg text-gray-500">✉</span>

                                <input
                                    id="login-email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full min-w-0 bg-transparent py-4 text-sm text-white outline-none placeholder:text-gray-600" />
                            </div>
                        </div>) : (<div className="mb-5">
                            <label htmlFor="login-mobile" className="mb-2 block text-sm font-medium text-gray-200">Mobile number</label>
                            <div className="flex items-center rounded-xl border border-white/10 bg-black/20 px-4 transition focus-within:border-[#f84464] focus-within:ring-2 focus-within:ring-pink-500/20">
                                <span className="border-r border-white/10 py-4 pr-3 text-sm text-gray-400">+91</span>
                                <input id="login-mobile"
                                    type="tel"
                                    inputMode="numeric"
                                    autoComplete="tel-national" maxLength={10}
                                    placeholder="Enter 10-digit number" value={mobile} onChange={(event) => setMobile(event.target.value.replace(/\D/g, "").slice(0, 10))}
                                    className="w-full min-w-0 bg-transparent py-4 pl-3 text-sm text-white outline-none 
                            placeholder:text-gray-600" />
                            </div>
                        </div>

                        )}


                        {/* PASSWORD INPUT */}
                        <div className="mb-4">
                            <label htmlFor="login-password" className="mb-2 block text-sm font-medium text-gray-200">Password</label>
                            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4
                            transition
                            focus-within:border-[#f84464]
                            focus-within:ring-2
                            focus-within:ring-pink-500/20">
                                <span aria-hidden="true" className="text-lg text-gray-500">🔒</span>
                                <input id="login-password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)}
                                    className="w-full min-w-0 bg-transparent py-4 text-sm text-white outline-none 
                                placeholder:text-gray-600" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "show password"}
                                    className="shrink-0 text-xs font-semibold text-pink-300 hover:text-white">
                                    {showPassword ? "HIDE" : "SHOW"}
                                </button>
                            </div>
                        </div>

                        {/* REMEMBER ME & FORGET PASSWORD */}

                        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
                            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-400">
                                <input type="checkbox"
                                    checked={rememberMe}
                                    onChange={(event) => setRememberMe(event.target.checked)}
                                    className="h-4 w-4 accent-[#f84464]" />Remember me</label>

                            <Link to="/forgot-password" className="text-sm font-semibold text-pink-300 transition hover:text-white">Forgot password?</Link>
                        </div>


                        {/* ERROR MESSAGE */}
                        {error && (
                            <p role="alert" className="mb-5 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>
                        )}


                        {/* SUCCESS MESSAGE */}
                        {message && (
                            <p role="status" className="mb-5 rounded-xl border border-green-400/20 bg-green-500/10 px-4 py-3 text-sm leading-6 text-green-300">
                                {message}
                            </p>
                        )}


                        {/* SIGN IN BUTTON */}
                        <button type="submit"
                            className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#f84464] to-[#e92d76] 
                        px-5 py-4 font-bold text-white shadow-lg shadow-pink-900/25 transition duration-300 hover:-translate-y-0.5
                        hover:shadow-xl
                        hover:shadow-pink-900/40
                        focus:outline-none focus:ring-2
                        focus:ring-pink-400
                        focus:ring-offset-2
                        focus:ring-offset-[#17121e]
                        active:translate-y-0">Sign In
                            <span className="transition-transform group-hover:translate-x-1"></span>
                        </button>




                    </form>

                    {/* DIVIDER */}
                    <div className="my-7 flex items-center gap-4">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="text-xs uppercase tracking-widest text-gray-500">New here?</span>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    {/* SIGN UP LINK  */}
                    <p className="text-center text-sm text-gray-400">Don't have an account?{""}
                        <Link to="/signup"
                            className="font-bold text-[#ff6b91] transition hover:text-white">Create account</Link>
                    </p>

                    {/* DISCLAIMER */}
                    <p className="mt-8 text-center text-xs leading-5 text-gray-500">By continuing, you agree to our{" "}
                        <Link to="/terms" className="underline hover:text-white">Terms</Link>{" "}and{" "}
                        <Link to="/privacy" className="underline hover:text-white">Privacy Policy</Link>
                    </p>

                </section>

            </div>



        </main>
    );

}



export default Signin;


















