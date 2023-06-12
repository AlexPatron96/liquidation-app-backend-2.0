const genCod = (data) => {
	var mapa = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
		codigo = data,
		i = 0;

	for (i; i < 8; i++) {
		codigo += mapa.charAt(Math.floor(Math.random() * mapa.length));
	}
	return codigo;
};

// const genCod = (data) => {
//   const prefix  = data;
//   let seq = 100000
//   const result = prefix + seq;
//   seq += 1;
//   return result;
// }

// serial_maker = function ( ) {

//     var prefix = '';
//     var seq = 0;
//     return {
//         set_prefix: function (p) {
//             prefix = String(p);
//         },
//         set_seq: function (s) {
//             seq = s;
//         },
//         gensym: function ( ) {
//             var result = prefix + seq;
//             seq += 1;
//             return result;
//         }
//     };
// };
module.exports = genCod;
