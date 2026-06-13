import { useState } from "react";

const USERS_KEY = "todoUsers";

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

function LoginPage({ onLoginSuccess }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!userId.trim() || !password.trim()) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    const users = getUsers();
    const isExistingUser = users.some((user) => user.userId === userId);

    if (isExistingUser) {
      alert("이미 가입된 아이디입니다.");
      return;
    }

    const newUser = {
      userId,
      password,
    };

    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    alert("회원가입이 완료되었습니다!");
  };

  const handleLogin = () => {
    if (!userId.trim() || !password.trim()) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    const users = getUsers();

    const matchedUser = users.find(
      (user) => user.userId === userId && user.password === password
    );

    if (!matchedUser) {
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      return;
    }

    onLoginSuccess(userId);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#eef4fb] px-6 py-10">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_rgba(125,145,180,0.18)] md:grid-cols-[0.9fr_1fr]">
        <section className="flex flex-col justify-center bg-gradient-to-br from-[#7ea6f7] to-[#8bc7f5] px-10 py-12 text-white">
          <h1 className="mt-5 text-4xl font-bold leading-tight">
            TMT
          </h1>
          <p className="mt-5 text-l font-medium leading-tight">
            To Much To do : 하루는 짧고, 할 일은 너무 많다
          </p>
        </section>

        <section className="px-10 py-12">
          <p className="text-sm font-semibold text-[#5e8ff6]">Login</p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            로그인
          </h2>

          <div className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-800">
                아이디
              </span>

              <input
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="아이디를 입력하세요"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none transition focus:border-[#7ea6f7] focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-800">
                비밀번호
              </span>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none transition focus:border-[#7ea6f7] focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </label>
          </div>

          <div className="mt-8 space-y-3">
            <button
              onClick={handleLogin}
              className="w-full rounded-2xl bg-[#6f97f6] py-4 text-base font-semibold text-white shadow-[0_10px_30px_rgba(111,151,246,0.25)] transition hover:bg-[#638cf0]"
            >
              로그인
            </button>

            <button
              onClick={handleSignup}
              className="w-full rounded-2xl bg-[#eef4ff] py-4 text-base font-semibold text-[#5e8ff6] transition hover:bg-[#e5eeff]"
            >
              회원가입
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LoginPage;