
function get_race_id() {
    return(document.URL.match(/\d{12}/)[0]);
}

function format_text(text) {
    return (text.replaceAll('\n', '').replaceAll(',', ''));
}

function downloadCSV(dataframe, filename) {
    let csv_string  = "";
    for (let d of dataframe) {
        csv_string += d.join(",");
        csv_string += '\r\n';
    }

    //BOMを付与する（Excelでの文字化け対策）
    let bom = new Uint8Array([0xef, 0xbb, 0xbf]);
    //CSVのバイナリデータを作る
    let blob        = new Blob([bom, csv_string], {type: "text/csv"});
    let url         = URL.createObjectURL(blob);

    //リンクタグを作る
    let link        = document.createElement("a");
    link.download   = filename;
    link.href       = url;

    //作ったリンクタグをクリックさせる
    document.body.appendChild(link);
    link.click();

    //クリックしたら即リンクタグを消す
    document.body.removeChild(link);
    delete link;
}

function create_main_table(rows) {
    let dataframe = new Array();
    for (const row of rows){
        var cols = row.getElementsByTagName('td');
        var data = new Array();
        for (const col in cols){
            data.push(format_text(col.textContent));
        }
        dataframe.push(data);
    }
    return(dataframe);
}


function get_main_table() {
    let race_id = get_race_id();
    let contents = document.getElementsByTagName('table', attrs={"class": "race_table_01"});
    let rows = contents[0].getElementsByTagName('tr');
    let dataframe = create_main_table(rows);
    downloadCSV(dataframe, race_id+'.csv');
}

// TODO: あとで作る
function create_prize_table(rows) {
    let dataframe = new Array();
    for (i = 1; i < 9; i++){
        let th = rows[0].getElementsByTagName('th')[0].textContent
    }

}

function get_prize_table() {
    let race_id = get_race_id();
    let contents = document.getElementsByTagName('table', attrs={"class": "race_table_01"});
    let rows1 = contents[1].getElementsByTagName('tr');
    let rows2 = contents[2].getElementsByTagName('tr');
    let rows = rows1.concat(rows2);
    downloadCSV(dataframe, race_id+'.csv');
}

function create_tansho_table(rows) {
    let dataframe = ['First', 'Odds'];
    for (const row of rows){
        var arr = row.getElementsByTagName('td');
        var data = new Array();
        data.push(format_text(arr[1].textContent));
        data.push(format_text(arr[5].textContent));
        dataframe.push(data);
    }
    return(dataframe);
}

function get_tansho_odds() {
    let element = document.getElementById("odds_navi_b1")
    element.getElementsByTagName('a')[0].click()
    let elements = document.getElementsByClassName("RaceOdds_HorseList_Table")
    let rows = elements[0].getElementsByTagName('tr')
    let dataframe = create_tansho_table(rows)
    downloadCSV(dataframe, filename)
}


function create_umaren_table(tables) {
    const dataframe = ['First', 'Second', 'Odds'];
    for (const table of tables){
        const rows = table.getElementsByTagName('tr');
        const first = format_text(rows[0].textContent)
        for (const row of Array.from(rows).slice(1)) {
            let data = [first];
            const cols = row.getElementsByTagName('td')
            for (const col of cols) {
                data.push(format_text(col.textContent))
            }
            dataframe.push(data)
        }
    }
    return(dataframe);
}

function get_umaren_odds() {
    let race_id = get_race_id();
    let element = document.getElementById("odds_navi_b4")
    element.getElementsByTagName('a')[0].click()
    let elements = document.getElementsByClassName("GraphOdds")
    let tables = elements[0].getElementsByTagName('table')
    let dataframe = create_umaren_table(tables)
    downloadCSV(dataframe, race_id+'_umaren_odds.csv')
}

function get_odds() {

}

