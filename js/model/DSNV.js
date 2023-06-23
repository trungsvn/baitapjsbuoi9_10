// console.log('ok')
function DSNV(){
    this.arrNV = [];
     this.themNV = function(nhanVien){
        this.arrNV.push(nhanVien)
    }
    this.timNV = function(maNhanVien){
        // var index = -1
        // B1: tìm index của phần tử cần xóa dựa vào thuộc tính mã sinh viên
        debugger
        console.log(this.arrNV.length)
        for (var i = 0; i < this.arrNV.length; i++) {
            var tknv = this.arrNV[i].tknv
            if (tknv === maNhanVien) {
                return i
            }
        }

        return -1
    }

    // this.xoaNV = function(){
        this.xoaNV = function (maNhanVien) {
            // var index = -1
            // // B1: tìm index của phần tử cần xóa dựa vào thuộc tính mã sinh viên
            // for (var i = 0; i < this.arrSV.length; i++) {
            //     var maSV = this.arrSV[i].maSV
            //     if (maSV === maSinhVien) {
            //         index = i
            //     }
            // }
            debugger
            var index = this.timNV(maNhanVien)
            //B2: xóa phần tử có index tìm đc
            if (index !== -1) {
                this.arrNV.splice(index, 1)
            }
            // return -1
        }
        this.capNhatNV = function (nhanVien) {
            var index = this.timNV(nhanVien.tknv)
            if (index !== -1) {
                this.arrNV[index] = nhanVien
            }
        }
}