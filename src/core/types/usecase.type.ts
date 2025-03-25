interface Usecase<T> {
  execute(params: T): Promise<void>;
}

export default Usecase;
