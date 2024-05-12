import { onValue, ref, set } from "firebase/database";
import { addDoc, collection } from "firebase/firestore";
import { FormEvent, useCallback, useEffect, useState } from "react";
import InstallPWA from "../install-button";
import Data from "../types/data";
import { database, firestore } from "../util/firebase-config";

function Home() {
  const [dataState, setDataState] = useState<Data | undefined>({
    prompt: "",
    counter: 0,
    start: false,
    flowRate: 0,
    ratio: 0,
    pulse: 0,
  });

  const [formState, setFormState] = useState({
    name: "",
  });

  const [isSaving, setIsSaving] = useState<"Save" | "Saving..." | "Saved">(
    "Save"
  );

  const getData = useCallback(() => {
    const prompt = ref(database, "/prompt");
    const counter = ref(database, "/counter");
    const start = ref(database, "/start");

    const flowRate = ref(database, "/flowRate");
    const ratio = ref(database, "/ratio");
    const pulse = ref(database, "/pulse");

    onValue(prompt, (snapshot) => {
      const data = snapshot.val();
      setDataState((prevState) => {
        return { ...prevState, prompt: data ? data : "Prompt would be here" };
      });
    });

    onValue(counter, (snapshot) => {
      const data = snapshot.val();
      setDataState((prevState) => {
        return { ...prevState, counter: data ? data : 0 };
      });
    });

    onValue(start, (snapshot) => {
      const data = snapshot.val();
      setDataState((prevState) => {
        return { ...prevState, start: data ? data : false };
      });
    });

    onValue(flowRate, (snapshot) => {
      const data = snapshot.val();
      setDataState((prevState) => {
        return { ...prevState, flowRate: data ? data : 0 };
      });
    });

    onValue(ratio, (snapshot) => {
      const data = snapshot.val();
      setDataState((prevState) => {
        return { ...prevState, ratio: data ? data : 0 };
      });
    });

    onValue(pulse, (snapshot) => {
      const data = snapshot.val();
      setDataState((prevState) => {
        return { ...prevState, pulse: data ? data : 0 };
      });
    });
  }, []);

  const resetData = useCallback(() => {
    // Reset data in firebase

    const promptRef = ref(database, "/prompt");

    const counterRef = ref(database, "/counter");

    const startRef = ref(database, "/start");
    const flowRateRef = ref(database, "/flowRate");
    const ratioRef = ref(database, "/ratio");
    const pulseRef = ref(database, "/pulse");

    set(promptRef, "");
    set(counterRef, 0);
    set(startRef, false);
    set(flowRateRef, 0);
    set(ratioRef, 0);
    set(pulseRef, 0);

    // Reset form state
    setFormState({
      name: "",
    });

    // Reset data state
    setDataState({
      prompt: "",
      counter: 0,
      start: false,
      flowRate: 0,
      ratio: 0,
      pulse: 0,
    });
  }, []);

  const saveData = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      async function save() {
        if (!dataState) {
          return;
        }

        setIsSaving("Saving...");

        try {
          await addDoc(collection(firestore, "records"), {
            name: formState.name,
            flowRate: dataState.flowRate,
            ratio: dataState.ratio,
            pulse: dataState.pulse,
          });
          setIsSaving("Saved");
          setTimeout(() => {
            setIsSaving("Save");
          }, 5000);
        } catch (e) {
          alert("An error occurred while saving data");
          setIsSaving("Save");
        }
      }

      save();
      resetData();
    },
    [dataState, formState, resetData]
  );

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!dataState) {
    return (
      <div className="absolute start-1/2 bottom-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <main className="py-5 px-2 md:max-w-[600px] mx-auto">
      <section className="border rounded-lg p-2 text-center py-12">
        <h3 className="text-sm">Please follow the prompt below</h3>
        <h1 className="text-2xl font-bold mt-4">{dataState.prompt}</h1>
        <h2 className="text-2xl font-bold text-accent">{dataState.counter}</h2>
      </section>

      <section className="border rounded-lg p-2 mt-4">
        <h3 className="mb-4 text-lg font-bold">Current Reading:</h3>
        <div>
          {/* flowrate */}
          PEF: <b>{dataState.flowRate} L/min</b>
        </div>
        <div>
          {/* ratio */}
          FEV/FVC: <b>{dataState.ratio} %</b>
        </div>
        <div>
          {/*  */}
          SP02: <b>{dataState.pulse} %</b>
        </div>
      </section>

      <section className="border rounded-lg p-2 mt-4">
        <h3 className="mb-4 text-lg font-bold">Save Data to Records:</h3>

        <form
          onSubmit={(e) => {
            saveData(e);
          }}
        >
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered input-accent w-full"
              required
              onChange={(e) => {
                setFormState({ name: e.target.value });
              }}
              value={formState.name}
            />
          </div>
          <div className="mt-4 flex gap-2 justify-end">
            <button className="btn btn-primary btn-outline" type="submit">
              {isSaving}
            </button>
            <button
              className="btn btn-outline"
              type="button"
              onClick={resetData}
            >
              Reset
            </button>
          </div>
        </form>
      </section>

      <section className="mt-2" style={{ textAlign: "center" }}>
        <InstallPWA />
      </section>
    </main>
  );
}

export default Home;
