import styled from 'styled-components';
import TopBar from '../../components/TopBar';
import { useState } from 'react';

export default function MainPage() {
  const [file, setFile] = useState()
  const [data, setData] = useState()
  return (
    <MainPageStyle>
      <TopBar data={data} setData={setData} file={file} setFile={setFile} />
    </MainPageStyle>
  );
}

const MainPageStyle = styled.div`
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;