import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateHospitalStats } from "../../Features/hospitalSlice";
import { fetchPatients } from "../../Features/patientSlice";
import { fetchWards } from "../../Features/wardSlice";

export default function Hospital() {
  const hospitalStats = useSelector((state) => state.hospital);
  const wards = useSelector((state) => state.wards.wards);
  const patients = useSelector((state) => state.patients.patients);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPatients());
    dispatch(fetchWards());
  }, []);

  useEffect(() => {
    const totalPatients = patients.length;
    const totalStayTime = patients.reduce(
      (acc, curr) => acc + curr.duration,
      0
    );

    const averageStayLength = totalStayTime / totalPatients;
    const totalCapacity = wards.reduce((acc, curr) => acc + curr.capacity, 0);

    const totalOccupancyRate = (totalPatients / totalCapacity) * 100;

    const wardOccupants = patients.reduce((acc, curr) => {
      const foundWard = acc.find((ward) => ward.ward === curr.ward);
      if (!foundWard) {
        acc.push({ ward: curr.ward, count: 1 });
      } else {
        acc = acc.map((ward) => {
          if (ward.ward === curr.ward) {
            ward.count++;
          }
          return ward;
        });
      }
      return acc;
    }, []);

    const topPerformingWard = wardOccupants.reduce((acc, curr) => {
      if (acc.count < curr.count) {
        return curr;
      } else {
        return acc;
      }
    }, wardOccupants[0]);

    dispatch(
      updateHospitalStats({
        totalPatients,
        totalOccupancyRate,
        averageStayLength,
        wardOccupants,
        topPerformingWard
      })
    );
  }, [wards, patients, dispatch]);

  return (
    <div className="container">
      <div className="container-data">
        <h1>Hospital Statistics</h1>
        <p>
          <strong>Total Patients:</strong> {hospitalStats.totalPatients}
        </p>
        <p>
          <strong>Occupancy Rate:</strong>{" "}
          {hospitalStats.totalOccupancyRate.toFixed(2)}%
        </p>
        <p>
          <strong>Average Stay Length:</strong>{" "}
          {hospitalStats.averageStayLength.toFixed(2)} days
        </p>
        <p>
          <strong>Top Performing Ward:</strong>{" "}
          {hospitalStats.topPerformingWard?.ward}
        </p>
        {hospitalStats.wardOccupants.map(({ ward, count }) => (
          <p>
            <strong>Patients in {ward} ward: </strong>
            {count}
          </p>
        ))}
      </div>
    </div>
  );
}
