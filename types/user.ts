export interface User {
  nama_pns?: string;
  nip?: string;
  tmpt_lahir?: string;
  tgl_lahir?: string;
  gender_nm?: string;
  agama_nm?: string;
  cpns_pns_nm?: string;
  opd_nm?: string;
  sub_opd_nm?: string;
  jns_jbtn_nm?: string;
  jabatan_nm?: string;
  golru_nm?: string;
  status_pns_nm?: string;
}

export interface UserResponse {
  result: User;
}
