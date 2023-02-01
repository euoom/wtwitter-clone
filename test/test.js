function add(x) {
    console.log(x)
    // console.log(this)
    return x
}

myObj = {
    tmp1: add,
    tmp2: function (args) {
        return add(args)
    }
}

a = myObj.tmp1({abc:1})
b = myObj.tmp2({abc:1})

_ = 1