
const NamingHelper = (args) => {
    let endofitem=-1, name='';
    args.forEach((arg, index) => {
        if(endofitem <= -1){
            if(arg.startsWith("-")) endofitem = index-1;
            }
        });

        if(endofitem <= -1) endofitem = args.length -1;

        for(let i = 0; i<=endofitem; i++){
            name += args[i] + " ";
        }
        name = name.slice(0, -1);
        return name;
}


module.exports = NamingHelper;