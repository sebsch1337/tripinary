import styled from "styled-components";
import Image from "next/image";
import githubSvg from "../../assets/github.svg";

export default function LoginGithubButton({ onClick }) {
  return (
    <GithubButton onClick={onClick}>
      <Image src={githubSvg} alt="github icon" width="35px" height="35px" />
      Login with GitHub
    </GithubButton>
  );
}

const GithubButton = styled.button`
  all: unset;
  padding: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 90%;
  height: 3rem;
  background-color: #24292e;
  border-radius: 0.5rem;
  color: #fff;
  font-size: 1.5rem;
`;
