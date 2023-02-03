import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';

export default function TopBar({ file, setFile, setData, data }) {
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vencimento, setVencimento] = useState();
  const [propriedade, setPropriedade] = useState();
  const [tipo, setTipo] = useState();

  function handleFile(e) {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    alert('arquivo selecionado');
  }
  function uploadFile() {
    if (disable) {
      return;
    }
    let formData = new FormData();
    formData.append('file', file);
    setLoading(true);
    setDisable(true);
    axios
      .post('http://localhost:4003/contas', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        setLoading(false);
        alert('dados registrados no banco de dados');
      })
      .catch(() => {
        setLoading(false);
        alert('Erro ao registrar dados no banco de dados');
      })
      .finally(() => setDisable(false));
  }
  function getPayments() {
    if (disable) {
      return;
    }
    let url = `http://localhost:4003/contas?`;
    if (propriedade) {
      url += `propriedade=${propriedade}`;
    }
    if (tipo) {
      if (propriedade) {
        url += `&tipo=${tipo}`;
      } else {
        url += `tipo=${tipo}`;
      }
    }
    if (vencimento) {
      if (tipo || propriedade) {
        url += `&vencimento=${
          '01-' + vencimento[5] + vencimento[6] + '-' + vencimento[0] + vencimento[1] + vencimento[2] + vencimento[3]
        }`;
      } else {
        url += `vencimento=${
          '01-' + vencimento[5] + vencimento[6] + '-' + vencimento[0] + vencimento[1] + vencimento[2] + vencimento[3]
        }`;
      }
    }
    setLoading(true);
    setDisable(true);
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
        setLoading(false);
        alert('Busca de dados feita com sucesso, verifique o console');
      })
      .catch(() => {
        setLoading(false);
        alert('erro ao buscar dados');
      })
      .finally(() => setDisable(false));
  }
  return (
    <TopBarStyle displaySpan={file ? 'inherit' : 'none'}>
      <label htmlFor="file-upload">search File.csv</label>
      <input id="file-upload" type="file" onChange={handleFile} />
      <Button disable={disable ? true : false} background={loading ? 'blue' : 'red'} onClick={uploadFile}>
        Registrar dados
      </Button>
      <div>
        <div>
          <select
            onChange={(e) => {
              setTipo(e.target.value);
            }}
            name="tipo"
            id="tipos"
          >
            <option value="" placeholder="tipos">
              Todas
            </option>
            <option value="A_Pagar">A Pagar</option>
            <option value="A_Receber">A Receber</option>
          </select>
          <input
            type="number"
            placeholder="Propriedade"
            onChange={(e) => {
              setPropriedade(e.target.value);
            }}
          />
          <input
            type="month"
            placeholder="Mes de Vencimento"
            onChange={(e) => {
              setVencimento(e.target.value);
            }}
          />
        </div>
        <div>
          <Button disable={disable ? true : false} onClick={getPayments} background={loading ? 'blue' : 'red'}>
            Buscar dados
          </Button>
        </div>
      </div>
    </TopBarStyle>
  );
}

const TopBarStyle = styled.div`
  background-color: white;
  height: 20vh;
  width: 60vw;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  padding: 5px;
  div {
    display: flex;
    margin-left: 50px;
    div {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      select {
        height: 30px;
        margin-bottom: 5px;
      }
      input {
        height: 30px;
        margin-bottom: 5px;
      }
    }
  }
  input[type='file'] {
    display: none;
  }
  label {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 8px 12px;
    cursor: pointer;
    background-color: #6d6d97;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
  }
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: 10px;
  width: 100px;
  height: 50px;
  background-color: ${(props) => props.background};
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 10px;
`;
