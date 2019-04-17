type StoreData = { [key: string]: any };

type StoreAction = (data: StoreData) => StoreData;
type StoreActions = StoreAction[];

class Store {
  protected data: StoreData = {};
  protected actions: StoreActions = [];
}

export default Store;
