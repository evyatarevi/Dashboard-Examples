type SetBidding = (data: string) => void;
type IncreaseCounter = () => void;

export const fetchData = async (setBidding: SetBidding) => {
  const data = await "Evyatar Bidding";
  setTimeout(() => setBidding(data), 3000);
};

export let counter = 0;
export const increaseCounter: IncreaseCounter = () => {
  counter++;
  console.log(counter);
};
