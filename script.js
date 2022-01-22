var wallet = ['Wallet'];
var currency_main = 'USD';
var currencylayer_api_key = 'KEY';

var fx_endpoint = 'http://api.currencylayer.com/';
var fx_url = fx_endpoint + 'live?access_key=' +  currencylayer_api_key;
currency = currency_main.toUpperCase();
currency == 'USD' ? console.log(currency) : currency.length == 3 ? (currency = 'USD' + currency ) : console.log('Re-Write currency as 3 letters');

const req = new Request(fx_url);
const data = await req.loadJSON();
var resp = data;
var fx_rate = 1;

currency == 'USD' ? fx_rate = 1 : fx_rate = resp['quotes'][currency];

 var n = 0;
 var usd = 0;
 var strong = 0;
 while (n < wallet.length) {
var balance_url = 'https://openapi.debank.com/v1/user/protocol?id=' + wallet[n] + '&protocol_id=strongblock' ;
const req = new Request(balance_url);
const data = await req.loadJSON();
 console.log(data);
 var resp = data;
 var total_cnt = resp['portfolio_item_list'].length;
  console.log(total_cnt);
  var i =0;
  while (i < total_cnt) {
   usd = usd + resp['portfolio_item_list'][i]['stats']['asset_usd_value'];
  local = usd * fx_rate;
strong = strong + resp['portfolio_item_list'][i]['detail']['token_list'][0]['amount'];
  i = i+1;
  }
n =n +1;
}
if (config.runsInWidget) {
    const widget = new ListWidget();
 widget.setPadding(16, 16, 16, 16);

 const req = new Request ("https://uxpub-wp.s3.eu-west-1.amazonaws.com/widget-bg.png");
 const i = new Request ("https://uxpub-wp.s3.eu-west-1.amazonaws.com/icon.png");

 let image = await req.loadImage();
 let icon = await i.loadImage();


  widget.backgroundImage = image;

  var stack = widget.addStack();


  const strongimg = stack.addImage(icon);
 strongimg.imageSize = new Size(28,28);

 stack.addSpacer(8);

 var stack2 = stack.addStack();
 stack2.layoutVertically();
 stack2.centerAlignContent();

    const title = stack2.addText("Strong token");
    const title2 = stack2.addText("rewards");
    title.textColor = Color.white();
    title.textOpacity = 0.3;
    title.font = Font.systemFont(12);
    title2.textColor = Color.white();
    title2.textOpacity = 0.3;
    title2.font = Font.systemFont(12);

    widget.addSpacer(20);

    const strongtext = widget.addText(`${strong.toFixed(2)}`);
    strongtext.textColor = Color.white();
    strongtext.font = Font.lightSystemFont(44);

    const usdtext = widget.addText(`${usd.toFixed(2)} USD`);
    usdtext.textColor = Color.white();
    usdtext.font = Font.systemFont(13);

    Script.setWidget(widget);
    Script.complete();
    widget.presentMedium()
}