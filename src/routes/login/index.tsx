import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { supabase } from "~/lib/supabaseClient";
import { useLocation } from "@builder.io/qwik-city";
import "./login.css";

export default component$(() => {
  const loc = useLocation();
  const step = useSignal<"email" | "otp" | "profile">("email");
  const email = useSignal("");
  const otp = useSignal("");
  const name = useSignal("");
  const surname = useSignal("");
  const loading = useSignal(false);
  const error = useSignal<string | null>(null);
  const resendCooldown = useSignal(0);

  // Giriş yapmadan önceki sayfayı al
  const redirectTo = loc.url.searchParams.get("redirect") || "/";

  const handleEmailLogin = $(async () => {
    loading.value = true;
    error.value = null;

    const { error: err } = await supabase.auth.signInWithOtp({
      email: email.value,
      options: { shouldCreateUser: true },
    });

    loading.value = false;

    if (err) error.value = err.message;
    else step.value = "otp";
  });

  const handleOtpVerify = $(async () => {
    loading.value = true;
    error.value = null;

    const { data, error: err } = await supabase.auth.verifyOtp({
      email: email.value,
      token: otp.value,
      type: "email",
    });

    loading.value = false;
    if (err) {
      error.value = err.message;
      return;
    }

    const user = data?.user;
    if (user) {
      const { data: profileData, error: profileErr } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileErr && profileErr.code !== "PGRST116") {
        error.value = profileErr.message;
        return;
      }

      if (profileData) {
        window.location.href = redirectTo;
      } else {
        step.value = "profile";
      }
    }
  });

  const handleOAuthLogin = $(async (provider: "google" | "facebook") => {
    loading.value = true;
    error.value = null;

    const { error: err } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/login?redirect=${encodeURIComponent(redirectTo)}`,
      },
    });

    loading.value = false;
    if (err) error.value = err.message;
  });

  useVisibleTask$(async () => {
    const { data, error: err } = await supabase.auth.getUser();
    if (err || !data?.user) return;

    const user = data.user;

    if (step.value === "otp" || step.value === "profile") return;

    const fullName =
      user.user_metadata?.full_name ||
      `${user.user_metadata?.name || ""} ${
        user.user_metadata?.surname || ""
      }`.trim();

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileData) {
      window.location.href = redirectTo;
      return;
    }

    await supabase.from("profiles").upsert({
      id: user.id,
      email: user.email,
      full_name: fullName || "",
      updated_at: new Date().toISOString(),
    });

    window.location.href = redirectTo;
  });

  const handleProfileSave = $(async () => {
    loading.value = true;
    error.value = null;

    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user) {
      error.value = "Kullanıcı bulunamadı.";
      loading.value = false;
      return;
    }

    const { error: err } = await supabase.from("profiles").upsert({
      id: user.id,
      email: email.value,
      full_name: `${name.value} ${surname.value}`.trim(),
      updated_at: new Date().toISOString(),
    });

    loading.value = false;

    if (err) error.value = err.message;
    else window.location.href = redirectTo;
  });

  const handleResend = $(async () => {
    if (resendCooldown.value > 0) return;
    resendCooldown.value = 30;

    await handleEmailLogin();

    const timer = setInterval(() => {
      resendCooldown.value -= 1;
      if (resendCooldown.value <= 0) clearInterval(timer);
    }, 1000);
  });

  return (
    <div class="login-container">
      <div class="login-left">
        <div class="login-content">
          <div class="logo">Kitlayer.</div>

          {step.value === "email" && (
            <>
              <h1 class="welcome-text">Welcome back</h1>
              {error.value && <p class="error-text">{error.value}</p>}

              <button
                class="google-btn"
                disabled={loading.value}
                onClick$={() => handleOAuthLogin("google")}
              >
                <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" />
                Continue with Google
              </button>

              <button
                class="facebook-btn"
                disabled={loading.value}
                onClick$={() => handleOAuthLogin("facebook")}
              >
                <img src="https://www.svgrepo.com/show/452196/facebook-1.svg" alt="Facebook" />
                Continue with Facebook
              </button>

              <div class="divider">
                <span>or</span>
              </div>

              <input
                type="email"
                class="email-input"
                placeholder="Enter email address"
                value={email.value}
                onInput$={(e) =>
                  (email.value = (e.target as HTMLInputElement).value)
                }
              />

              <button
                class="continue-btn"
                disabled={loading.value || !email.value}
                onClick$={handleEmailLogin}
              >
                Continue
              </button>

              <p class="terms">
                By continuing, you agree to our{" "}
                <a href="/terms">Terms of Service</a> and{" "}
                <a href="/privacy">Privacy Policy</a>.
              </p>
            </>
          )}

          {step.value === "otp" && (
            <div class="otp-section">
              <h2 class="welcome-text">Enter Your Code</h2>
              <p class="info-text">
                <strong>{email.value}</strong> We've sent a code to your address.
              </p>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                class="otp-input"
                placeholder="------"
                value={otp.value}
                onInput$={(e) =>
                  (otp.value = (e.target as HTMLInputElement).value)
                }
              />

              {error.value && <p class="error-text">{error.value}</p>}

              <button
                class="continue-btn"
                disabled={loading.value || otp.value.length !== 6}
                onClick$={handleOtpVerify}
              >
                Continue
              </button>

              <button
                class="resend-btn"
                disabled={resendCooldown.value > 0}
                onClick$={handleResend}
              >
                {resendCooldown.value > 0
                  ? `Resend (${resendCooldown.value}s)`
                  : "Resend Code"}
              </button>
            </div>
          )}

          {step.value === "profile" && (
            <div class="otp-section">
              <h2 class="welcome-text">Welcome</h2>
              <p class="info-text">Please fill in your details.</p>

              <input
                type="text"
                class="email-input"
                placeholder="Name"
                value={name.value}
                onInput$={(e) =>
                  (name.value = (e.target as HTMLInputElement).value)
                }
              />
              <input
                type="text"
                class="email-input"
                placeholder="Surname (Optional)"
                value={surname.value}
                onInput$={(e) =>
                  (surname.value = (e.target as HTMLInputElement).value)
                }
              />

              {error.value && <p class="error-text">{error.value}</p>}

              <button
                class="continue-btn"
                disabled={loading.value}
                onClick$={handleProfileSave}
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>

      <div class="login-right">
        <div class="mockup-grid">
          <img src="/images/login/loginHero.svg" alt="Login mockup" class="mockup-image" />
        </div>
      </div>
    </div>
  );
});