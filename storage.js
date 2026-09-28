/* ===== 3. STORAGE ===== */
const KEY='sbd_history';
function load(){try{return JSON.parse(localStorage.getItem(KEY))||[]}catch(e){return mem}}
let mem=[];
function save(h){mem=h;try{localStorage.setItem(KEY,JSON.stringify(h))}catch(e){}}
