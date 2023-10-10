export class KLAConstants {
  request_type = {
    JOBPOSTREQUEST: "JOBPOSTREQUEST",
    INTERVIEWPANELREQUEST: "INTERVIEWPANELREQUEST",
    RECRUITMENTREQUEST: "RECRUITMENTREQUEST",
    CANDIDATESELECTREQUEST: "CANDIDATESELECTREQUEST",
    EMPLOYEEJOINREQUEST:'EMPLOYEEJOINREQUEST'

  };
  getJobPostRequestType() {
    return this.request_type.JOBPOSTREQUEST;
  }
  getInterviewPanelRequestType() {
    return this.request_type.INTERVIEWPANELREQUEST;
  }
  getRecruitementRequestType() {
    // Amritha Function for recruitement request type
    return this.request_type.RECRUITMENTREQUEST;
  }
  getShortListedRecruitementRequestType() {
    return this.request_type.CANDIDATESELECTREQUEST;
  }
  getEmployeeJoinReqType(){
    return this.request_type.EMPLOYEEJOINREQUEST;
  }
}
