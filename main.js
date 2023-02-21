import begin from "./src/three";

const SERVICE = "81c30e5c-0000-4f7d-a886-de3e90749161";

let floatArray;
let data = [];

function docReady(callback) {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    setTimeout(callback);
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
}

docReady(() => {
  console.log("docready");
  begin(data);

  function handleCharacteristicValueChanged(event) {
    let value = event.target.value.buffer;
    let dataView = new DataView(value);

    // Read the first float value
    data[0] = dataView.getFloat32(0, true);

    // Read the second float value
    data[1] = dataView.getFloat32(4, true);

    // Read the third float value
    data[2] = dataView.getFloat32(8, true);

    // Read the fourth float value
    data[3] = dataView.getFloat32(12, true);

    // Read the fifth float value
    data[4] = dataView.getFloat32(16, true);

    // Read the sixth float value
    data[5] = dataView.getFloat32(20, true);
  }
  const button = document.querySelector("button");

  button.addEventListener("click", (e) => {
    console.log("click");
    navigator.bluetooth
      .requestDevice({
        filters: [{ services: [SERVICE] }],
      })
      .then((device) => device.gatt.connect())
      .then((server) => {
        console.log(server);
        return server.getPrimaryService(SERVICE);
      })
      .then((service) => {
        console.log(service);
        return service.getCharacteristic(
          "81c30e5c-1001-4f7d-a886-de3e90749161"
        );
      })
      .then((characteristic) => {
        console.log(characteristic);
        console.log(characteristic.readValue());
        characteristic.startNotifications().then(() => {
          console.log("Notifications started");
          characteristic.addEventListener(
            "characteristicvaluechanged",
            handleCharacteristicValueChanged
          );
        });
      })
      .catch((error) => console.error(error));
  });
});
