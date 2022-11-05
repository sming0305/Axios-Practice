let data = [];

const list = document.querySelector(".list");
const count = document.querySelector("#count");
const addSetButton = document.querySelector("#addSetButton");
const form = document.querySelector("form");
const addSetName = document.querySelector("#name");
const addSetImg = document.querySelector("#img");
const addSetLocation = document.querySelector("#addlocation");
const addSetPrice = document.querySelector("#price");
const addSetGroup = document.querySelector("#groupNum");
const addSetRate = document.querySelector("#star");
const addSetDescription = document.querySelector("#describe");
const locationSearch = document.querySelector("#locationSearch");
const noSearchInfomation = document.querySelector(".noSearchInformation");

// 透過axios撈取資料
axios.get("https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json")
  .then(function (response) {
    data = response.data.data;
    init();
  })

// 渲染畫面
function renderData(dataBase) {
  let str = "";
  let countNum = dataBase.length;

  if (dataBase.length === 0) {
    noSearchInfomation.innerHTML = `
    <div>
    <p class="fs-16 fw-bold text-gary py-5 px-30 text-center">查無相關資料</p>
    <img src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/js_week5/no_found.png" class="mx-auto" alt="not_found">
    </div>`;
  } else {
    noSearchInfomation.innerHTML = "";
  }

  dataBase.forEach(function (item) {
    str += `
    <li class="list__card shadow rounded-2 mb-19 d-flex flex-column">
    <div class="position-relative">
        <p class="position-absolute px-5 py-10 bg-color-secondary text-white fs-10 line-height-1_2 rounded-ex-2 z-6"
            style="top: -12px">${item.area}</p>
        <span class="position-absolute px-2 py-4 bg-color-primany text-white rounded-ex-2 z-6 list__card__rate">${item.rate}</span>
        <div class="over-hidden">
            <img src="${item.imgUrl}"
                alt="櫻花" class="list__card__img">
        </div>
    </div>
    <div class="py-10 pt-10 pb-7 d-flex flex-column flex-grow-1">
        <h3 class="fs-12 fw-bold pb-2 border-bottom-2 border-primany mb-8 list__card__title">
        ${item.name}</h3>
        <p class="text-gary mb-11 flex-grow-1">
        ${item.description}
        </p>
        <div class="d-xs-flex justify-content-between align-items-center">
            <p class="fw-bold d-xs-flex text-center align-items-center"><span
                    class="material-symbols-outlined me-3 fs-10">
                    error
                </span>剩下最後${item.group}組</p>
            <p class="fw-Medium d-xs-flex text-center align-items-center">TWD<span
                    class="fs-16 ms-2">${item.price}</span>
            </p>
        </div>
    </div>
    </li>`;
  })

  list.innerHTML = str;
  count.textContent = ` 本次搜尋共 ${countNum} 筆資料`;
}


// 套票寫入功能
addSetButton.addEventListener("click", function (e) {

  let id = data.length;
  let name = addSetName.value.trim();
  let imgUrl = addSetImg.value.trim();
  let area = addSetLocation.value.trim();
  let price = addSetPrice.value.trim();
  let group = addSetGroup.value.trim();
  let rate = addSetRate.value.trim();
  let description = addSetDescription.value.trim();

  let deBugInfo = [name, imgUrl, price, group, rate, description];
  let rule = {
    "0": "套票名稱",
    "1": "圖片網址",
    "2": "套票金額",
    "3": "套票組數",
    "4": "套票星級",
    "5": "套票描述"
  };

  let deBugInfoSpace = deBugInfo.findIndex(item => item === "");
  if (deBugInfoSpace !== -1) {
    Swal.fire({icon:'error', title:`新增套票時<br/>${rule[deBugInfoSpace]}不可空白`});
    return;
  }
  else if (isNaN(parseInt(price)) || isNaN(parseInt(group)) || isNaN(parseInt(rate))) {
    Swal.fire({icon:'error', title:`新增套票時<br/>套票金額.套票組數.套票星級<br/>僅能輸入數字`});
    return;
  }
  else if (rate >= 10 && rate < 1) {
    Swal.fire({icon:'error', title:`新增套票時<br/>套票星級範圍為1~10`});
    return;
  }
  else if (description.length >= 100) {
    Swal.fire({icon:'error', title:`新增套票時<br/>套票描述限100字內`});
    return;
  }
  else if (area === "請選擇景點地區") {
    Swal.fire({icon:'error', title:`新增套票時<br/>請選擇景點所在地區`});
    return;
  }

  data.push({ id, name, imgUrl, area, price, group, rate, description });
  form.reset();
  locationSearch.value = "全部地區";
  Swal.fire({icon:'success', title:`新增成功`});
  renderData(data);
})

// 篩選功能
locationSearch.addEventListener("change", function (e) {
  let location = locationSearch.value;
  let filterData = data.filter(item => item.area === location);

  if (location === "全部地區") {
    renderData(data);
  } else {
    renderData(filterData);
  }
})

function init(){
  renderData(data);
}
















