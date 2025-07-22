var receiptTime;
var receiptHourValue = new Number();
var receiptMinValue = new Number();
var useTimeValue = new Number();
var chargeValue = new Number();
var totalValue = new Number();
var maxChargeValue = new Number();
var count = new Number();

window.onload = function(){
    
}

// フォーカスアウト入力チェック
document.addEventListener('DOMContentLoaded', () => {

    // 入庫時
    receiptHourValue = document.getElementById('receiptHour');
    receiptHourValue.addEventListener('focusout', () => {
        // 整数チェック
        isInteger(receiptHour.value, 'receiptHour');
        // 入力値チェック
        inputValueCheck(23, receiptHourValue.value, ERR_002, 'receiptHour')
    })

    // 入庫分
    receiptMinValue = document.getElementById('receiptMin');
    receiptMinValue.addEventListener('focusout', () => {
        // 整数チェック
        isInteger(receiptMin.value, 'receiptMin');
        // 入力値チェック
        inputValueCheck(59, receiptMinValue.value, ERR_003, 'receiptMin')
    })

    // 利用時間取得
    useTimeValue = document.getElementById('useTime');
    useTimeValue.addEventListener('focusout', () => {
        // 整数チェック
        isInteger(useTime.value, 'useTime');
        // 入力値チェック
        inputValueCheck(3, useTimeValue.value.length, ERR_004, 'useTime')
    })
    
    // 利用料金取得
    chargeValue = document.getElementById('charge');
    chargeValue.addEventListener('focusout', () => {
        // 整数チェック
        isInteger(charge.value, 'charge');
        // 入力値チェック
        inputValueCheck(4, chargeValue.value.length, ERR_005, 'charge')
    })

    // 最大料金
    maxChargeValue = document.getElementById('maxCharge');
    maxChargeValue.addEventListener('focusout', () => {
        // 整数チェック
        isInteger(maxChargeValue.value, 'maxCharge');
        // 入力値チェック
        inputValueCheck(4, maxChargeValue.value.length, ERR_005, 'maxCharge')
    });
});

// 整数チェック
function isInteger(value, className) {
    if(!/^\d+$/.test(value) && value) {
        errDia(ERR_001, className);
    }
}

// 入力値チェック
function inputValueCheck(threshold, value, errCd, className) {
    if(threshold < value) {
        errDia(errCd, className);
    }
}

// 入力チェックエラーダイアログ発砲
function errDia(errCd, value) {
    if(!alert(errCd)) {
        setTimeout(() => {
            document.getElementById(value).focus();
        }, 0);
    }
}

// 空欄チェック
function blankCheck(errCd, value) {
    // valueのシンプルblank判定
    if(value === '') {
        // ダイアログ発砲
        alert(errCd);
    }
}

// 入庫時間
function currentTime() {

    // 空判定
    if(document.getElementById('receiptHour').value || document.getElementById('receiptMin').value) {
        // 入力済みの場合は上書きダイアログを発砲
        if(!window.confirm(DIA_001)) {
            // ダイアログキャンセルの場合は処理中断
            return;
        }
    }

    // 現在時刻を取得し画面に反映
    receiptTime = new Date();
    document.forms.receipt.receiptHour.value = receiptTime.getHours().toString().padStart(2, '0');
    document.forms.receipt.receiptMin.value = receiptTime.getMinutes().toString().padStart(2, '0');
}

function calculation() {

    // 入庫時刻取得
    receiptHourValue = (document.getElementById('receiptHour')).value;
    receiptMinValue = (document.getElementById('receiptMin')).value;
    blankCheck(ERR_006, receiptHourValue);
    blankCheck(ERR_007, receiptMinValue);
    receiptTime = new Date();
    receiptTime.setHours(receiptHourValue, receiptMinValue, 0, 0);

    // 利用時間取得
    useTimeValue = (document.getElementById('useTime')).value;
    blankCheck(ERR_008, useTimeValue);
    
    // 利用料金取得
    chargeValue = (document.getElementById('charge')).value;
    blankCheck(ERR_009, chargeValue);
    
    // 最大料金取得
    maxChargeValue = (document.getElementById('maxCharge')).value;

    totalValue = new Number();
    var priceListHtml = new String;
    priceListHtml = '<tr> <th> 時刻 </th> <th> 料金 </th> </tr>';

    if(!maxChargeValue) {
        var maxHour = 12 * 60;
        var maxCount = maxHour / useTimeValue
        if (maxCount >= 10) {
            maxCount = 10;
        }
        maxChargeValue = maxCount * chargeValue;
    }

    // 時間手入力した時変になる
    while (totalValue < maxChargeValue) {
        receiptTime.setMinutes(receiptTime.getMinutes() + Number(useTimeValue));
        totalValue = Number(totalValue) + Number(chargeValue);
        
        priceListHtml = priceListHtml + '<tr> <th>' 
        + receiptTime.toLocaleTimeString().substr(0, receiptTime.toLocaleTimeString().length - 3)
        + '</th> <th>' + totalValue + '</th> </tr>';
        
        document.getElementById('priceList').innerHTML = priceListHtml;

        count++;

        if(count == 10) {
            break;
        }
    }
        
}