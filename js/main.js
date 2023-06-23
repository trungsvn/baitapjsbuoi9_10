function getElement(selector) {
    return document.querySelector(selector)
}
var dsnv = new DSNV()

getLocalStorage()


function getThongtinNv(isEdit) {
    // lấy thông tin nhân viên
    debugger
    var tknv = getElement('#tknv').value;
    var name = getElement('#name').value;
    var email = getElement('#email').value;
    var password = getElement('#password').value;
    var date = getElement('#date').value;
    var luongCB = getElement('#luongCB').value;
    var chucvu = getElement('#chucvu').value;
    var gioLam = getElement('#gioLam').value;

    var nhanVien = new NhanVien(
        tknv,
        name,
        email,
        password,
        date,
        luongCB,
        chucvu,
        gioLam,

    )
    console.log('nhanvien', nhanVien)
    // console.log(nhanVien.tknv)
    // console.log(nhanVien.name)
    // console.log(nhanVien.date)
    // console.log(nhanVien.luongCB)

    var isValid = true

    // Kiểm tra mã NV
    isValid &= kiemTraChuoi(
        nhanVien.tknv,
        1,
        undefined,
        '#tbTKNV', 'Tài khoản nhân viên không được bỏ trống'
    ) &&
        kiemTraChuoi(nhanVien.tknv, 4, 6, '#tbTKNV', 'Tài khoản nhân viên từ 4 đến 6 ký tự') &&
        kiemTraMaNV(nhanVien.tknv, DSNV, isEdit, '#tbTKNV', 'Tài khoản nhân viên đã tồn tại')

    // Kiểm tra tên nhân viên
    isValid &= kiemTraChuoi(
        nhanVien.name,
        1,
        undefined,
        '#tbTen',
        'Tên nhân viên không được bỏ trống'
    ) &&
        kiemTraPattern(
            nhanVien.name,
            '#tbTen',
            /[a-zA-Z\s\u00C0-\u1EF9]+$/,
            'Tên nhân viên phải là chữ hoặc khoảng trắng'
        )

    //kiểm tra email  
    isValid &= kiemTraPattern(
        nhanVien.email,
        '#tbEmail',
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Email không đúng định dạng'
    )

    // kiểm tra password
    isValid &= kiemTraPattern(
        nhanVien.password,
        '#tbMatKhau',
        /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*))/
        , 'Password phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt'
    )

    // kiểm tra ngày làm mm/dd/yyyy
    isValid &= kiemTraPattern(
        nhanVien.date,
        '#tbNgay',
        /(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)\d{2}/,
        'Sai định dạng định dạng mm/dd/yyyy'
    )
    // kiểm tra lương CB
    if (nhanVien.luongCB < 1000000 || nhanVien.luongCB > 20000000) {
        getElement("#tbLuongCB").innerHTML = "Lương CB từ 1000000 đến 20000000"
        getElement("#tbLuongCB").style.display = "block"
    }

    // kiểm tra chức vụ

    console.log(nhanVien.chucvu)
    if (nhanVien.chucvu === "Chọn chức vụ") {
        getElement("#tbChucVu").innerHTML = "Chưa chọn chức vụ"
        getElement("#tbChucVu").style.display = 'block'
    }

    // kiểm tra giờ làm 80 - 200 giờ
    console.log(nhanVien.gioLam)
    if (nhanVien.gioLam < 80 || nhanVien.gioLam > 200) {
        getElement("#tbGiolam").innerHTML = "Giờ làm từ 80h - 200h"
        getElement("#tbGiolam").style.display = "block"
    }

    return isValid ? nhanVien : undefined
}
// xóa nhân viên
function deleteNV(tknv) {
    debugger
    console.log(tknv)
    dsnv.xoaNV(tknv)

    // Gọi lại hàm render để cập nhật lại UI sau khi xóa thành công
    renderdsnv()

    // cập nhật lại data lưu dưới local storage
    setLocalStorage()
}
// return nhanVien
// THÊM NHÂN VIÊN
getElement("#btnThemNV").onclick = function () {
    // lấy thông tin nhân viên
    debugger
    var nhanVien = getThongtinNv(false);

    // thêm nhân viên
    if (nhanVien) {
        // DSNV.arrNV = [];
        // DSNV.arrNV.push(nhanVien);

        //     if (nhanVien){
        //         DSNV.arrNV.push(nhanVien)
        //     // DSNV.themNV(nhanVien);
        //     console.log(DSNV.arrNV);

        // }

        
        console.log(nhanVien)
        dsnv.themNV(nhanVien)
        console.log(dsnv.arrNV)
        renderdsnv();
        setLocalStorage();
        // getElement('#form').reset();
    }
}
// XUẤT RA DANH SÁCH NHÂN VIÊN
function renderdsnv(arrNV = dsnv.arrNV) {
    console.log('arrNV',arrNV)
    var content = '';
    for (i = 0; i < arrNV.length; i++) {
        var nv = arrNV[i]
        content += `
        <tr>
            <td>${nv.tknv}</td>
            <td>${nv.name}</td>
            <td>${nv.email}</td>
            <td>${nv.date}</td>
            <td>${nv.chucvu}</td>
            <td>${nv.tinhTongluong()}</td>
            <td>${nv.xepLoai()}</td>
            <td>
                    <button 
                        class='btn btn-success mr-3'
                        onclick="updateNV('${nv.tknv}')"
                    >
                        Edit
                    </button>
                    <button class='btn btn-danger' onclick="deleteNV('${nv.tknv}')">Delete</button>
                </td>
        </tr>
    `
    }
    getElement('#tableDanhSach').innerHTML = content
}

// Lưu danh sách nhân viên vào localStorage
function setLocalStorage() {
    // B1: chuyển data về dạng string
    var data = JSON.stringify(DSNV.arrNV)
    //B2: Lưu vào local
    localStorage.setItem('DSNV', data)

    // localStorage.setItem('DSNV',JSON.stringify(dssv.arrSV))
}

// get danh sách nhân viên từ localStorage
function getLocalStorage() {
    debugger
    //B1: lấy data từ local
    var data = localStorage.getItem('DSNV') // null

    //B2: parse data về kiểu dữ liệu ban đầu
    if (data) {
        var parseData = JSON.parse(data)
        // console.log('parseData: ', parseData)

        // Tạo lại đối tượng sinhVien từ lớp đối SinhVien để lấy lại phương thức tinhDTB
        //B1: tạo mảng rỗng để lưu dssv
        var arr = []

        // B2: duyệt mảng đc lấy từ local
        for (var i = 0; i < parseData.length; i++) {
            var nv = parseData[i]
            console.log('nv: ', nv)
            // tạo lại đối tượng sv từ lớp đối tượng SV
            var nhanVien = new NhanVien(
                nv.tknv,
                nv.name,
                nv.email,
                nv.password,
                nv.date,
                nv.luongCB,
                nv.chucvu,
                nv.gioLam,
            )
            // thêm sinhVien vào mảng arr
            arr.push(nhanVien)
        }

        // gán giá trị cho mảng arrSV từ data lấy từ localStorage
        DSNV.arrNV = arr
        console.log('arr: ', arr)
        renderdsnv()
    }
}

// cập nhật sinh viên
function updateNV(tknv) {
    debugger
    // console.log('maSV: ', maSV)
    var index = dsnv.timNV(tknv)
    // console.log('index: ', index)
    var nv = dsnv.arrNV[index]
    console.log('nv: ', nv)

    // đẩy data lên input
    getElement('#tknv').value = nv.tknv
    getElement('#name').value = nv.name
    getElement('#email').value = nv.email
    getElement('#password').value = nv.password
    getElement('#date').value = nv.date
    getElement('#luongCB').value = nv.luongCB
    getElement('#chucvu').value = nv.chucvu
    getElement('#gioLam').value = nv.gioLam
    getElement('#btnThem').style.display = "block"

}

// Cập nhật lại sinh viên
getElement('#btnUpdate').onclick = function () {
    // Lấy lại thông tin sinh viên sau khi chỉnh sửa xong
    var nhanVien = getThongTinNV(true)
    // cập nhật sinh viên
    dsnv.capNhatNV(nhanVien)

    //  render lại UI
    renderdsnv()

    // cập nhật data local
    setLocalStorage()

    // reset form
    getElement('#formQLSV').reset()
}