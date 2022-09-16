import { useEffect, useState } from "react";
// const sendmail = require('sendmail')();
// import { SMTPClient } from 'emailjs';
import axios from "axios";
import Papa from "papaparse";
export default function Home() {
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);
  const [mail, setMail] = useState();

  const changeHandler = (e) => {
    console.log(e.target.files[0]);
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log(results.data);

        const rowsArray = [];
        const valuesArray = [];
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });
        setParsedData(results.data);
        setTableRows(rowsArray[0]);
        setValues(valuesArray);

        let arr = [];
        console.log(valuesArray.length);
        for (let i = 0; i < valuesArray.length; i++) {
          //  console.log("value",values[i][1])
          let mail_id = valuesArray[i][1];

          arr.push(mail_id);
        }

        setMail(arr);
      },
    });
  };

  const mailer = async () => {
    if (mail) {
      console.log("mail", mail);
      const { data } = await axios.post(
        `http://localhost:3010/mail/send_mail`,
        {
          mail,
        }
      );
    }
    // if(data.success){
    //   console.log("success");
    // }
  };

  return (
    <div>
      <h1>Mail</h1>
      <input
        type="file"
        name="file"
        accept=".csv"
        onChange={changeHandler}
        style={{ display: "block", margin: "10px auto" }}
      />

      <table>
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => {
            return (
              <tr key={index}>
                {value.map((val, i) => {
                  return <td key={i}>{val}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <>
        <button onClick={mailer}>Send Mail </button>
      </>
    </div>
  );
}
