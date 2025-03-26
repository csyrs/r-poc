import reddit from "rr-api";

type RRDatasetId = string;
interface RRDatasetStatus {
  asOf: number;
  data?: any;
  error?: Error | false;
  loading: boolean;
  partial?: boolean;
}
type RRInteractionId = string;
interface RRInteractionStatus {
  error: Error | false;
  sending: boolean;
  success: boolean;
}

const data = {
  preload: (id: RRDatasetId) => {
    reddit.load(id);
  },
  sync: (id: RRDatasetId, onChange: (status: RRDatasetStatus) => void) => {
    reddit.loadWatch(id, onChange);
  },
  update: (
    id: RRInteractionId,
    payload: object,
    onChange?: (status: RRInteractionStatus) => void,
  ) => {
    reddit.submit(id, payload, onChange);
  },
};

export default data;
