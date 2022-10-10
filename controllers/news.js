const cheerio = require('cheerio');
const X = require('axios');

async function get(req, res) {
    try {
    var page = req.params.page;
    const options = {
        method: 'GET',
        url: page == null ? process.env.BASE_URL : `${process.env.BASE_URL}/page/${page}`
    }
    const rest = await X(options);
    const $ = cheerio.load(rest.data);
    var list = [];
    $('#content > section > div > div.listingResult.small').each((index,item)=>{
        const title = item.children[0].next.children[0].next.children[2].next.children[0].next.children[0].next.children[0].data;
        const author = item.children[0].next.children[0].next.children[2].next.children[0].next.children[2].next.children[0].next.children[1].children[0].data.substring(1);
        const createdAt = item.children[0].next.children[0].next.children[2].next.children[0].next.children[2].next.children[3].attribs.datetime;
        var description;
        if(item.children[0].next.children[0].next.children[2].next.children[2].next.children[1] != null){
            description = item.children[0].next.children[0].next.children[2].next.children[2].next.children[1].data;
        }else{
            item.children[0].next.children[0].next.children[2].next.children[2].next.children[0].data;
        }
        const image = item.children[0].next.children[0].next.children[1].children[0].next.attribs['data-original'];
        const newsDetail = item.children[0].next.attribs.href;
        list.push({title,author,createdAt,description,image,newsDetail});
    });
        return res.status(200).send(list);
    } catch (e) {
        return res.status(404).json({ message: String(e) });
    }
};

module.exports = {
    get
}
