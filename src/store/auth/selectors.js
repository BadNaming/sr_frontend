export const getUser = ({ auth }) => auth.user

export const isAuthentication = ({ auth }) => auth.isAuthenticated

export const isSuccess = ({ auth }) => auth.onSuccess

export const serverError = ({ auth }) => auth.errors

export const getAdvPlatform = ({ auth }) => auth.AdvPlatform

export const getAdvCabinet = ({ auth }) => auth.AdvCabinet

export const isAdvCabinetSuccess = ({ auth }) => auth.isAdvCabinet

export const getStartDate = ({ report }) => report.start_date

export const getEndDate = ({ report }) => report.end_date

export const getAdPlans = ({ report }) => report.ad_plans
