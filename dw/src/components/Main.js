import axios from "axios";
import React, { Component } from "react";
import DatePicker from "react-datepicker";
import fileDownload from "js-file-download";
import "react-datepicker/dist/react-datepicker.css";

export default class Main extends Component {
  state = {
    inputName: "Export",
    startdate: new Date(),
    enddate: new Date(),
    downloading: false,
    startDate: "",
    endDate: "",
  };

  componentDidMount = () => {
    let date = new Date();
    let start = this.dateFormatter(date);
    let end = this.dateFormatter(date);

    // console.log(start);

    this.setState({startDate: start, endDate: end})
  }

  handleType = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleStartDate = (date) => {
    let newStartDate = this.dateFormatter(date); 
    this.setState({ startDate: newStartDate, startdate: date });
  };

  handleEndDate = (date) => {
    let newEndDate = this.dateFormatter(date); ;
    this.setState({ endDate: newEndDate, enddate: date });
  };

  dateFormatter = (date) => {
    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0");
    let yyyy = date.getFullYear();

    let newDate = yyyy + "-" + mm + "-" + dd;
    return newDate;
  }

  downloadRequest = () => {
    axios
      .post(`http://localhost:8080/f/files`, {
        fileName: this.state.inputName,
        beginDate: this.state.startDate,
        endDate: this.state.endDate,
      })
      .then((result) => {
        console.log("donwloading");
        this.setState({ fileName: result.data.fileName, downloading: true});
        this.checkStatus(this.state.fileName);
      })
      .catch((err) => {
        console.log("error");
      });
  };

   downloadFile = async (fileName) => {
    if (this.state.downloading) {
      await axios
        .post(`http://localhost:8080/f/files/download/${fileName}`)
        .then((result) => {
          fileDownload(result.data, fileName);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  checkStatus = (fileName) => {
    const interval = setInterval(() => {
      console.log("Logs every minute");
      axios
        .post(`http://localhost:8080/f/files/status/${fileName}`)
        .then((result) => {
          if (result.data.status === "done") {
            clearInterval(interval);
            this.downloadFile(fileName);
            this.setState({downloading: false});
          }
          console.log(result.data.status);
        });
    }, 2000);
  };

  render() {
    return (
      <div className="box">
        <div className="field pb-2">
          <label className="label">Файлын нэр</label>
          <input className="input column is-5" placeholder="Exxxx" name="inputName" type="text" onChange={this.handleType}/>
        </div>
        <div className="columns" style = {{paddingLeft : 4}}>
            <div className="columns p-4">
                <DatePicker className="column box m-1" selected={this.state.startdate} onChange={(date) => this.handleStartDate(date)}/>
                <DatePicker className="column box m-1" selected={this.state.enddate} onChange={(date) => this.handleEndDate(date)}/>
            </div>
            <div className="column pt-3" >
                {this.state.downloading ? (
                    
                    <button type="button"
                    className="button is-link is-loading"
                    onClick={this.downloadRequest}
                    >
                        Татах
                </button>
                ) : (
                    <button
                    type="button"
                    className="button is-link is-active"
                    onClick={this.downloadRequest}
                    >
                    Татах
                    </button>
                )}
            </div>
        </div>
      </div>
    );
  }
}
