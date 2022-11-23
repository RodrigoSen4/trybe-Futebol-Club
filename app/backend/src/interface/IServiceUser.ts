import ErrorMap from '../utils/errorMap';

export default interface IServiceUser {
  type: ErrorMap | null,
  message: string
}
