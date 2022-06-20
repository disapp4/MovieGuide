/**
 * Позволяет форматировать строки
 * Пример var s2 = "My name: {0}, age: {1}!".f("Neo", 20);
 * https://wcoder.github.io/notes/string-format-for-string-formating-in-javascript
 * @type {String.f}
 */
 String.prototype.format  = function(){
    var args = arguments;
    return this.replace(/\{(\d+)\}/g, function(m,n){
        return args[n] == null ? m : args[n].toString() ;
    });
};