export const translateErrorMessage = (originMessage: string) => {
  let translated = "에러가 발생했습니다.";
  switch (originMessage) {
    case "To signup, please provide your email":
      translated = "이메일을 입력해주세요";
      break;
    case "Signup requires a valid password":
      translated = "비밀번호를 다시 한번 확인해주세요";
      break;
    case "User already registered":
      translated = "이미 가입된 이메일입니다.";
      break;
    case "Only an email address or phone number should be provided on signup.":
      translated = "";
      break;
    case "Signups not allowed for this instance":
      translated = "";
      break;
    case "Email signups are disabled":
      translated = "";
      break;
    case "Email link is invalid or has expired":
      translated = "";
      break;
    case "Token has expired or is invalid":
      translated = "";
      break;
    case "The new email address provided is invalid":
      translated = "";
      break;
    case "Password should be at least 6 characters":
      translated = "비밀번호는 최소 6자리 이상이여야 합니다.";
      break;
    case "Invalid login credentials":
      translated = "로그인을 실패했습니다. 아이디와 비밀번호를 확인해주세요.";
    case "Unable to validate email address: invalid format":
      translated = "이메일을 확인해주세요";
      break;
  }

  return translated;
};
