import { Timestamp, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../util/firebase-config";

export default function History() {
  const [data, setData] = useState<
    {
      name: string;
      flowRate: number;
      pulse: number;
      ratio: number;
      timestamp: Timestamp;
    }[]
  >([]);

  const [search, setSearch] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    //get from firestore

    const q = await getDocs(collection(firestore, "records"));

    setData([]);

    q.forEach((doc) => {
      const d = doc.data();
      setData((prev) => [
        ...prev,
        {
          name: d.name,
          flowRate: d.flowRate,
          pulse: d.pulse,
          ratio: d.ratio,
          timestamp: d.timestamp,
        },
      ]);
    });

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="absolute start-1/2 bottom-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <main className="py-5 px-2 md:max-w-[600px] mx-auto">
      <section className="my-4">
        <input
          type="text"
          placeholder="Enter name to search"
          className="input input-bordered input-accent w-full"
          required
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        />
      </section>

      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>PEF</th>
            <th>FEV/FVC</th>
            <th>SP02</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter(
              (d) => d.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
            )
            .map((d, i) => (
              <tr key={i}>
                <td>{d.name}</td>
                <td>{d.flowRate}</td>
                <td>{d.ratio}</td>
                <td>{d.pulse}</td>
                <td>{d.timestamp.toDate().toLocaleString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
}
