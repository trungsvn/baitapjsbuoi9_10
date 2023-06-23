function NhanVien(
    _tknv,
    _name,
    _email,
    _password,
    _date,
    _luongCB,
    _chucvu,
    _gioLam,
) {
    this.tknv = _tknv;
    this.name = _name;
    this.email = _email;
    this.password = _password;
    this.date = _date;
    this.luongCB = _luongCB;
    this.chucvu = _chucvu;
    this.gioLam = _gioLam;

    this.tinhTongluong = function () {
        var heso = 0;
        if (this.chucvu==="Sếp") heso = 3
        if (this.chucvu==="Trưởng phòng") heso = 2
        if (this.chucvu==="Nhân viên") heso = 1
        
        return this.luongCB*heso
    }
    this.xepLoai = function(){
        if (this.gioLam < 160) return "nhân viên trung bình"
        if (this.gioLam >=160 && this.gioLam < 176) return "nhân viên khá"
        if (this.gioLam >=176 && this.gioLam < 192) return "nhân viên giỏi"
        if (this.gioLam >=192) return "nhân viên xuất sắc"
    }
}