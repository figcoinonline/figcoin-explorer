const backend = process.env.NEXT_PUBLIC_NODE_ADDRESS
  ? process.env.NEXT_PUBLIC_NODE_ADDRESS
  : "http://localhost:3001/";

export { backend };
