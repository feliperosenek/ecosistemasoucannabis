import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import apiRequest from "../../modules/apiRequest";
import User from "../../modules/User";
import GenderInput from "../forms/GenderInput";
import NationalityInput from "../forms/NationalityInput";
import AlertError from "../forms/AlertError";
import MultiSelectField from "../forms/CIAPInput";
import Modal from "react-bootstrap/Modal";
import LabelInfo from "../pages/elements/labelInfo";

const AssociateSignUp = () => {
  const [user, setUser] = useState({});
  const [inputError, setInputError] = useState(false);
  const [fieldsError, setFieldsError] = useState(false);
  const [validateForm, setValidateForm] = useState();
  const [cpfError, setCpfError] = useState(false);
  const [rgError, setRgError] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [cpfNotValid, setCpfNotValid] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const handleClose = () => setShowPopup(false);
  const handleShow = () => setShowPopup(true);

  const codeUser = localStorage.getItem("user_code");

  useEffect(() => {
    (async () => {
      const userData = await User();
      setUser(userData);
    })();

    const timer = setTimeout(() => {}, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (user.associate_status > 3) {
    window.location.assign("/");
  }

  const [formData, setFormData] = useState({
    status: "patient",
    responsable_type: "patient",
    name_associate: null,
    lastname_associate: null,
    birthday_associate: null,
    gender: null,
    nationality: null,
    cpf_associate: null,
    rg_associate: null,
    emiiter_rg_associate: null,
    marital_status: null,
    email: null,
    street: null,
    number: null,
    complement: null,
    neighborhood: null,
    city: null,
    state: null,
    cep: null,
    reason_treatment: null,
    mobile_number: null,
    reason_treatment_text: null,
    associate_status: 9,
  });

  formData.email = user.email_account;
  formData.mobile_number = user.mobile_number;

  const handleChangeInput = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectionChange = event => {
    setFormData({
      ...formData,
      ["reason_treatment"]: event,
    });
  };

  const handleChandePhoneBlur = event => {
    const validatePhone = formData.mobile_number;
    if (event.target.value && !validatePhone.includes("+55")) {
      setShowPopup(true);
    }
  };

  const handleChangeInputPhone = event => {
    setFormData({
      ...formData,
      ["mobile_number"]: event,
    });
    setInputError(false);
  };
  const handleChoice = choice => {
    handleClose();
  };

  const validateCPFAssociate = value => {
    if (!value) {
      return "O CPF é obrigatório";
    }
    const cleanedValue = value.replace(/[^\d]/g, "");
    if (cleanedValue.length !== 11) {
      return "O CPF deve ter 11 dígitos";
    }
    setFormData({ ...formData, cpf_associate: value });
    return undefined;
  };

  const validateRGAssociate = value => {
    if (!value) {
      return "O RG é obrigatório";
    }
    const cleanedValue = value.replace(/[^\d]/g, "");
    if (cleanedValue.length !== 7) {
      return "O RG deve ter 7 dígitos";
    }
    setFormData({ ...formData, rg_associate: value });
    return undefined;
  };

  const statesData = [
    { value: "AC", label: "Acre" },
    { value: "AL", label: "Alagoas" },
    { value: "AP", label: "Amapá" },
    { value: "AM", label: "Amazonas" },
    { value: "BA", label: "Bahia" },
    { value: "CE", label: "Ceará" },
    { value: "DF", label: "Distrito Federal" },
    { value: "ES", label: "Espírito Santo" },
    { value: "GO", label: "Goiás" },
    { value: "MA", label: "Maranhão" },
    { value: "MT", label: "Mato Grosso" },
    { value: "MS", label: "Mato Grosso do Sul" },
    { value: "MG", label: "Minas Gerais" },
    { value: "PA", label: "Pará" },
    { value: "PB", label: "Paraíba" },
    { value: "PR", label: "Paraná" },
    { value: "PE", label: "Pernambuco" },
    { value: "PI", label: "Piauí" },
    { value: "RJ", label: "Rio de Janeiro" },
    { value: "RN", label: "Rio Grande do Norte" },
    { value: "RS", label: "Rio Grande do Sul" },
    { value: "RO", label: "Rondônia" },
    { value: "RR", label: "Roraima" },
    { value: "SC", label: "Santa Catarina" },
    { value: "SP", label: "São Paulo" },
    { value: "SE", label: "Sergipe" },
    { value: "TO", label: "Tocantins" },
  ];

  const updateUser = async event => {
    event.preventDefault();

    var emptyFields = [];

    for (let key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (formData[key] == null || formData[key] == undefined || formData[key] == "" || formData[key] == []) {
          emptyFields.push(key);
          if (key != "mobile_number" && key != "status" && key != "responsable_type" && key != "associate_status" && key != "reason_treatment" && key != "email" && key != "mobile_number") {
            document.querySelector("#" + key).className = "form-input input-login input-empty";
          }
        } else {
          if (key != "mobile_number" && key != "status" && key != "responsable_type" && key != "associate_status" && key != "reason_treatment" && key != "email" && key != "mobile_number") {
            document.querySelector("#" + key).className = "form-input input-login";
          }
        }

        if (key == "reason_treatment") {
          document.querySelector("#" + key).className = "form-input input-login css-b62m3t-container input-empty";
        }

        if (formData.reason_treatment == [] || formData.reason_treatment == null) {
          document.querySelector("#reason_treatment").className = "css-b62m3t-container input-empty";
        } else {
          document.querySelector("#reason_treatment").className = "css-b62m3t-container";
        }
      }
    }

    if (emptyFields != []) {
      setValidateForm(true);
    } else {
      setValidateForm(false);
    }

    const validateCPF = formData.cpf_associate;
    if (validateCPF && validateCPF.includes("_")) {
      setCpfError(true);
      setTimeout(() => {
        setCpfError(false);
      }, 6000);

      emptyFields.push("cpf");
    } else {
      function realCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, "");
        if (cpf.length !== 11) return false;

        let soma = 0;
        for (let i = 0; i < 9; i++) {
          soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = 11 - (soma % 11);
        let digito1 = resto === 10 || resto === 11 ? 0 : resto;

        soma = 0;
        for (let i = 0; i < 10; i++) {
          soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = 11 - (soma % 11);
        let digito2 = resto === 10 || resto === 11 ? 0 : resto;

        return parseInt(cpf.charAt(9)) === digito1 && parseInt(cpf.charAt(10)) === digito2;
      }

      if (!realCPF(validateCPF)) {
        emptyFields.push("cpf");
        setCpfNotValid(true);
        setTimeout(() => {
          setCpfNotValid(false);
        }, 6000);
      }
    }

    const validateRg = formData.rg_associate;
    if (validateRg && validateRg.includes("_")) {
      setRgError(true);
      setTimeout(() => {
        setRgError(false);
      }, 6000);

      emptyFields.push("rg");
    }

    setFieldsError(true);
    setTimeout(() => {
      setFieldsError(false);
    }, 6000);

    if (emptyFields == "" || emptyFields == [] || emptyFields[0] == "complement") {
      setFieldsError(false);
      formData.responsable_code = codeUser;

      await apiRequest("/api/directus/create-user", formData, "POST")
        .then(response => {})
        .catch(error => {
          console.error(error);
        });

      window.location.assign("/documentos");
    }
  };

  return (
    <div>
      <Modal show={showPopup} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Você é estrangeiro?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Se seu número for de outro país clique SIM</h5>
          <button class="btn btn-primary button-modal" variant="secondary" onClick={() => handleChoice(true)}>
            Sim
          </button>
          <button class="btn btn-warning warning-button-modal  button-modal" variant="primary" onClick={() => handleChoice(false)}>
            Não, digitei errado
          </button>
        </Modal.Body>
      </Modal>

      <form onSubmit={updateUser} className="form-container ">
        <h1 className="sub-title">Cadastro Paciente</h1>
        <br></br>

        <br></br>
        <div>
          <div className="mb-3">
            <label className="form-label" htmlFor="name_associate">
              Primeiro nome
            </label>
            <input placeholder="Digite o primeiro nome do paciente" class="form-input input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.name_associate} type="text" id="name_associate" name="name_associate"></input>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="lastname_associate">
              Sobrenome
            </label>
            <input placeholder="Digite o sobrenome do paciente" class="form-input input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.lastname_associate} type="text" id="lastname_associate" name="lastname_associate"></input>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="birthday_associate">
              Data de nascimento
            </label>
            <input class="form-input input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.birthday_associate} type="date" id="birthday_associate" name="birthday_associate"></input>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="gender">
              Identidade de gênero <LabelInfo message="Escolha o gênero ou digite com qual você se identifica" id="gen" />
            </label>
            <GenderInput className="form-input" name="gender" handleChangeInput={handleChangeInput} />
          </div>
          <br></br>
          <div className="mb-3">
            <label className="form-label" htmlFor="nationality">
              Nacionalidade <LabelInfo message="Escolha o país onde nasceu" id="nac" />
            </label>
            <NationalityInput name="nacionality" handleChangeInput={handleChangeInput} />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="cpf_associate">
              CPF <LabelInfo message="Necessário para a geração doo termo de responsabilidade do associado" id="cpf" />
            </label>
            <InputMask mask="999.999.999-99" value={formData.cpf_associate} onChange={handleChangeInput} onBlur={handleChangeInput}>
              {inputProps => <input placeholder="Digite o CPF do paciente" value={formData.cpf_associate} type="text" id="cpf_associate" name="cpf_associate" className="form-input" {...inputProps} />}
            </InputMask>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="rg_associate">
              RG <LabelInfo message="Necessário para a geração doo termo de responsabilidade do associado" id="rg" />
            </label>
            <InputMask mask="9.999.999" value={formData.rg_associate} onChange={handleChangeInput} onBlur={handleChangeInput}>
              {inputProps => <input placeholder="Digite o RG do paciente" type="text" value={formData.rg_associate} id="rg_associate" name="rg_associate" className="form-input" {...inputProps} />}
            </InputMask>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="emiiter_rg_associate">
              Orgão emissor <LabelInfo message="Informe o orgão emissor do seu rg" id="org" />
            </label>
            <input placeholder="Digite orgão emissor do documento" class="form-input input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.emiiter_rg_associate} type="text" id="emiiter_rg_associate" name="emiiter_rg_associate"></input>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="marital_status">
              Estado civil
            </label>
            <select class="form-input input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.marital_status} type="text" id="marital_status" name="marital_status">
              <option value="Solteiro">Solteiro(a)</option>
              <option value="Casado">Casado(a)</option>
              <option value="Viúvo">Viúvo(a)</option>
              <option value="Divorciado">Divorciado(a)</option>
            </select>
          </div>
          <br></br>
          <br></br>
          <div className="mb-3">
            <label className="form-label" htmlFor="street">
              Rua
            </label>
            <input placeholder="Digite a rua do endereço" class="form-input input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.street} type="text" id="street" name="street"></input>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="number">
              Número
            </label>
            <input placeholder="Digite o número ou bloco" class="form-input input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.number} type="text" id="number" name="number"></input>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="complement">
              Complemento
            </label>
            <input placeholder="Digite um complemento se necessário" class="form-input input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.complement} type="text" id="complement" name="complement"></input>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="neighborhood">
              Bairro
            </label>
            <input placeholder="Digite o bairro" class="form-input input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.neighborhood} type="text" id="neighborhood" name="neighborhood"></input>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="city">
              Cidade
            </label>
            <input placeholder="Digite a cidade" class="form-input input-login" onChange={handleChangeInput} value={formData.city} type="text" id="city" name="city"></input>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="state">
              Estado
            </label>
            <select class="form-input input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.state} type="text" id="state" name="state">
              <option value="">Selecione...</option>
              {statesData.map(state => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="cep">
              CEP
            </label>
            <input placeholder="Digie o CEP" class="form-input input-login" onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.cep} type="text" id="cep" name="cep"></input>
          </div>
          <br></br>
          <br></br>
          <div className="mb-3">
            <label className="form-label" htmlFor="reason_treatment">
              Motivo principal para o tratamento
            </label>
            <MultiSelectField onChange={handleSelectionChange} value={formData.reason_treatment} name="reason_treatment" />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="reason_treatment_text">
              Descreva com suas palavras o motivo do seu tratamento <LabelInfo message="Informe com suas palavras os motivos do seu tratamento" id="trattxt" />
            </label>
            <textarea onChange={handleChangeInput} onBlur={handleChangeInput} value={formData.reason_treatment_text} as="textarea" id="reason_treatment_text" name="reason_treatment_text" />
          </div>

          <button class="btn btn-success btn-lg btn-float-right" type="submit">
            Enviar dados
          </button>
        </div>

        {fieldsError && <AlertError message="Você precisa preencher todos os campos" />}
        {cpfError && (
          <div class="alert2">
            <AlertError message="O CPF precisa estar completo" />
          </div>
        )}
        {rgError && (
          <div class="alert3">
            <AlertError message="O RG precisa estar completo" />
          </div>
        )}
        {cpfNotValid && (
          <div class="alert3">
            <AlertError message="O CPF digitado não é válido" />
          </div>
        )}
      </form>
    </div>
  );
};

export default AssociateSignUp;
