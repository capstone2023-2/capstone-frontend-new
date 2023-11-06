"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/apis";

// 회원가입
export default function SignUpPage() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const [wrongEmail, setWrongEmail] = useState<boolean>(false);
  const [wrongNickname, setWrongNickname] = useState<boolean>(false);
  const [wrongPassword, setWrongPassword] = useState<boolean>(false);
  const [wrongPasswordConfirm, setWrongPasswordConfirm] =
    useState<boolean>(false);

  // 입력된 이메일의 유효성을 검사합니다.
  // ToDo: 중복된 이메일이라면 새로운 State (duplicatedEmail)를 생성하여 Reject
  function checkEmailRestraint(emailInput: string) {
    const regex = /[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+/i;

    if (emailInput.length != 0 && !regex.test(emailInput)) {
      setWrongEmail(true);
    } else {
      setWrongEmail(false);
    }
  }

  // 입력된 이메일을 변경합니다.
  function handleEmail(e: { target: any }) {
    setEmail(e.target.value);
    setWrongEmail(false);
  }

  // 입력된 닉네임의 유효성을 검사합니다.
  function checkNicknameRestraint(nicknameInput: string) {
    // 특수 문자 및 한글 단자음/단모음 여부를 확인합니다.
    const specialRegex = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    const hangeulRegex = /([^가-힣a-z\x20])/i;

    // ToDo: 중복된 닉네임이 있을 경우 새로운 State (duplicatedNickname)를 생성하여 Reject
    if (
      nicknameInput.length != 0 &&
      (specialRegex.test(nicknameInput) ||
        hangeulRegex.test(nicknameInput) ||
        nicknameInput.length < 2 ||
        nicknameInput.length > 12)
    ) {
      setWrongNickname(true);
    } else {
      setWrongNickname(false);
    }
  }

  // 입력된 닉네임을 변경합니다.
  function handleNickname(e: { target: any }) {
    setNickname(e.target.value);
    setWrongNickname(false);
  }

  // 입력된 비밀번호의 유효성을 검사합니다. (영어, 숫자, 특수문자 1개 이상 + 8자리 이상 + 16자리 이하)
  function checkPasswordRestraint(passwordInput: string) {
    const letterRegex = /[A-Za-z]/i;
    const numberRegex = /[0-9]/i;
    const specialRegex = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

    if (
      passwordInput.length != 0 &&
      (!letterRegex.test(passwordInput) ||
        !numberRegex.test(passwordInput) ||
        !specialRegex.test(passwordInput) ||
        passwordInput.length < 8 ||
        passwordInput.length > 16)
    ) {
      setWrongPassword(true);
    } else {
      setWrongPassword(false);
    }
  }

  // 입력된 비밀번호를 변경합니다.
  function handlePassword(e: { target: any }) {
    setPassword(e.target.value);
    setWrongPassword(false);
  }

  // 입력된 비밀번호 확인란이 현재 입력된 비밀번호와 일치하는지 검사합니다.
  function checkPasswordConfirmRestraint(passwordConfirmInput: string) {
    if (passwordConfirmInput.length == 0 || passwordConfirmInput === password) {
      setWrongPasswordConfirm(false);
    } else {
      setWrongPasswordConfirm(true);
    }
  }

  // 입력된 비밀번호 확인란을 변경합니다.
  function handlePasswordConfirm(e: { target: any }) {
    setPasswordConfirm(e.target.value);
    setWrongPasswordConfirm(false);
  }

  // 회원가입을 진행합니다.
  async function handleSignUpSubmit(e: FormEvent) {
    e.preventDefault();

    // 잘못된 정보가 입력되어 있다면 회원가입하지 않습니다.
    if (
      wrongEmail ||
      wrongNickname ||
      wrongPassword ||
      wrongPasswordConfirm ||
      email.length == 0 ||
      nickname.length == 0 ||
      password.length == 0 ||
      passwordConfirm.length == 0
    ) {
      return;
    }

    const success = await signUp({
      email: email,
      password: password,
      nickname: nickname,
    });

    if (success) {
      router.push("/sign-up/success");
    }
  }

  return (
    <form
      className="vbox(right) w(500) py(40) mx(auto) gap(24) ~lg:w(~90vw)"
      method="post"
      onSubmit={handleSignUpSubmit}
    >
      <p className="w(100%) label text-xl c(--primary) pb(20)">회원가입</p>
      <div className="vbox w(100%) gap(4)">
        <label htmlFor="id" className="label text-medium c(--primary)">
          이메일
        </label>
        <input
          type="text"
          name="id"
          id="id"
          className={`paragraph text-medium c(--black) b(1/solid/--primary) outline(none) r(4) p(4/12) nowrap... focus:b(2/solid/--accent)+my(-1) ${
            wrongEmail ? "b(2/solid/--negative)+my(-1)" : ""
          }`}
          value={email}
          onChange={handleEmail}
          onBlur={() => checkEmailRestraint(email)}
          autoFocus
        ></input>
        {wrongEmail ? (
          <span className="paragraph text-small c(--negative)">
            잘못된 이메일 형식이 작성되었습니다.
          </span>
        ) : (
          <></>
        )}
      </div>
      <div className="vbox w(100%) gap(4)">
        <label htmlFor="nickname" className="label text-medium c(--primary)">
          닉네임
        </label>
        <label
          htmlFor="nickname"
          className="paragraph text-small c(--content-secondary)"
        >
          {
            "2자 이상, 12자 이하 (한글, 영어, 숫자 입력 가능, 특수문자 입력 불가)"
          }
        </label>
        <input
          type="text"
          name="nickname"
          id="nickname"
          className={`paragraph text-medium c(--black) b(1/solid/--primary) outline(none) r(4) p(4/12) nowrap... focus:b(2/solid/--accent)+my(-1) ${
            wrongNickname ? "b(2/solid/--negative)+my(-1)" : ""
          }`}
          value={nickname}
          onChange={handleNickname}
          onBlur={() => checkNicknameRestraint(nickname)}
        ></input>
        {wrongNickname ? (
          <span className="paragraph text-small c(--negative)">
            잘못된 닉네임 형식이 작성되었습니다.
          </span>
        ) : (
          <></>
        )}
      </div>
      <div className="vbox w(100%) gap(4)">
        <label htmlFor="password" className="label text-medium c(--primary)">
          비밀번호
        </label>
        <label
          htmlFor="password"
          className="paragraph text-small c(--content-secondary)"
        >
          {"8자 이상, 16자 이하 (영어, 숫자, 특수문자 각각 1자 이상)"}
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className={`paragraph text-medium c(--black) b(1/solid/--primary) outline(none) r(4) p(4/12) nowrap... focus:b(2/solid/--accent)+my(-1) ${
            wrongPassword ? "b(2/solid/--negative)+my(-1)" : ""
          }`}
          value={password}
          onChange={handlePassword}
          onBlur={() => checkPasswordRestraint(password)}
        ></input>
        {wrongPassword ? (
          <span className="paragraph text-small c(--negative)">
            잘못된 비밀번호 형식이 작성되었습니다.
          </span>
        ) : (
          <></>
        )}
      </div>
      <div className="vbox w(100%) gap(4)">
        <label
          htmlFor="password-confirm"
          className="label text-medium c(--primary)"
        >
          비밀번호 확인
        </label>
        <input
          type="password"
          name="password-confirm"
          id="password-confirm"
          className={`paragraph text-medium c(--black) b(1/solid/--primary) outline(none) r(4) p(4/12) nowrap... focus:b(2/solid/--accent)+my(-1) ${
            wrongPasswordConfirm ? "b(2/solid/--negative)+my(-1)" : ""
          }`}
          value={passwordConfirm}
          onChange={handlePasswordConfirm}
          onBlur={() => checkPasswordConfirmRestraint(passwordConfirm)}
        ></input>
        {wrongPasswordConfirm ? (
          <span className="paragraph text-small c(--negative)">
            비밀번호를 다르게 입력하였습니다.
          </span>
        ) : (
          <></>
        )}
      </div>
      <div className="h(12)"></div>
      <div className="hbox w(100%) gap(auto)">
        <div className="hbox gap(8) user-select-none">
          <span className="paragraph text-medium c(--primary)">
            계정이 있다면?
          </span>
          <Link
            href="/sign-in"
            className="label text-medium c(--primary) pointer"
          >
            로그인 화면으로 돌아가기
          </Link>
        </div>
        <button className="w(100) label text-medium c(--primary) b(1/solid/--primary) r(8) p(4/12)">
          확인
        </button>
      </div>
    </form>
  );
}

SignUpPage.displayName = "Sign";
