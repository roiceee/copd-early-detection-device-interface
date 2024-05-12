import { useCallback, useEffect, useMemo, useState } from "react";
import Data from "./types/data";
import firebaseConfig from "./util/firebase-config";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
import determineStressLevel from "./util/stress-converter";
import InstallPWA from "./install-button";
import Card from "./components/card";
import dateToDateString from "./util/date-converter";
import CustomLineChart from "./components/custom-chart";

function App() {
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  const [dataState, setDataState] = useState<Data | undefined>(undefined);

  const [dataArray, setDataArray] = useState<{ timeStamp: Date; data: Data }[] | undefined>(
    undefined
  );

  const getData = useCallback(() => {
    const gsr = ref(database, "/gsr");
    const heartRate = ref(database, "/heartRate");
    const bodyTemp = ref(database, "/temp");

    onValue(gsr, (snapshot) => {
      const data = snapshot.val();
      setDataState((prevState) => {
        return { ...prevState, gsr: data };
      });
    });
    onValue(heartRate, (snapshot) => {
      const data = snapshot.val();
      setDataState((prevState) => {
        return { ...prevState, heartRate: data };
      });
    });
    onValue(bodyTemp, (snapshot) => {
      const data = snapshot.val();
      setDataState((prevState) => {
        return { ...prevState, bodyTemp: data };
      });
    });
  }, [database]);

  const renderDataArray = useMemo(() => {

    if (!dataArray) {
      return;
    }

    return dataArray.map((data, index) => {
      return (
        <tr key={`data-${index}`}>
          <td>{dateToDateString(data.timeStamp)}</td>
          <td>{data.data.gsr} uS</td>
          <td>{data.data.heartRate} BPM</td>
          <td>{data.data.bodyTemp}°C</td>
          <td>
            {determineStressLevel(
              data.data.gsr!,
              data.data.heartRate!,
              data.data.bodyTemp!
            )}
          </td>
        </tr>
      );
    });
  }, [dataArray]);

  useEffect(() => {
    if (!dataState) {
      return;
    }
    setDataArray((prevState) => {
      if (!prevState) {
        return [{ timeStamp: new Date(), data: dataState}];
      }
      return [...prevState, { timeStamp: new Date(), data: dataState }];
    });
  }, [dataState]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!dataState || !dataArray) {
    return (
      <div className="position-absolute top-50 start-50">
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="py-5 px-2">
      <Card>
        <h2>Stress Monitoring System</h2>
        <div>
          <i>Project of Group 7</i>
        </div>
      </Card>

      <Card>
        <h4>Current Reading</h4>
        <section className="mt-4 d-flex flex-column gap-2">
          <div>
            GSR: <b>{dataState.gsr} uS</b>
          </div>
          <div>
            Heart Rate: <b>{dataState.heartRate} BPM</b>
          </div>
          <div>
            Body Temperature: <b>{dataState.bodyTemp}°C</b>
          </div>
          <div>
            Stress Level:{" "}
            <b>
              {determineStressLevel(
                dataState.gsr!,
                dataState.heartRate!,
                dataState.bodyTemp!
              )}
            </b>
          </div>
        </section>
      </Card>

      <Card>
        <div>
          <h5>Past Readings</h5>
        </div>
        <div className="mb-2">
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              setDataArray(undefined);
            }}
          >
            Reset
          </button>
        </div>
        <div
          className=" rounded-2"
          style={{ maxHeight: "400px", overflow: "auto" }}
        >
          {dataArray.length > 0 ? (
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th>Time Stamp (HH:mm:ss:SSS)</th>
                  <th>GSR</th>
                  <th>Heart Rate</th>
                  <th>Body Temperature</th>
                  <th>Stress Level</th>
                </tr>
              </thead>
              <tbody>{renderDataArray ? renderDataArray.reverse() : <></>}</tbody>
            </table>
          ) : (
            <div className="text-center">No Data Available</div>
          )}
        </div>
      </Card>

      <Card className="px-0">
        <section className=" h-100 w-100" style={{ height: "200px" }}>
          <h3 className="px-4">GSR</h3>
          <CustomLineChart
            dataArray={dataArray.map((data) => {
              return {
                columnName: dateToDateString(data.timeStamp),
                value: data.data.gsr!,
              };
            })}
          />
        </section>
      </Card>

      <Card className="px-0">
        <section className=" h-100 w-100" style={{ height: "200px" }}>
          <h3 className="px-4">Heart Rate (BPM)</h3>
          <CustomLineChart
            dataArray={dataArray.map((data) => {
              return {
                columnName: dateToDateString(data.timeStamp),
                value: data.data.heartRate!,
              };
            })}
          />
        </section>
      </Card>

      <Card className="px-0">
        <section className=" h-100 w-100" style={{ height: "200px" }}>
          <h3 className="px-4">Body Temperature (°C)</h3>
          <CustomLineChart
            domain={[33, 40]}
            dataArray={dataArray.map((data) => {
              return {
                columnName: dateToDateString(data.timeStamp),
                value: data.data.bodyTemp!,
              };
            })}
          />
        </section>
      </Card>

      <section className="mt-2" style={{ textAlign: "center" }}>
        <InstallPWA />
      </section>
    </main>
  );
}

export default App;
