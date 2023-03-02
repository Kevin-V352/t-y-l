import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background: url('/assets/backgrounds/home.webp') no-repeat fixed;
  background-size: 100% 105vh;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    padding: 10px 20px;
  };

  @media screen and (min-width: 1024px) {
    padding: 20px 40px;
    background-size: cover;
  };
`;

export const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
