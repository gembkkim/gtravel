const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors()); // 모든 도메인에서의 요청 허용
app.use(express.json()); // JSON 요청 본문을 파싱하기 위해

const logYn = false;

const config = {
  server: '61.101.193.131',
  port: 1433,
  database: 'gtraveldb',
  user: 'gtravel',
  password: 'qwer1324',
  options: {
    encrypt: false,
  },
};

app.get('/', async (req, res) => {
  console.log('============================= /(root) GET start');
  try {
    const pool = await sql.connect(config);

    const data = pool
      .request()
      .input('user_id', sql.TYPES.VarChar, 'gembkkim')
      // .query("select * from  users where user_id like '%' + @user_id + '%'");
      .query('asp_users_k @user_id'); // 프로시저 호출 시
    data
      .then(res1 => {
        console.log('---- /(root) res1.recordset');
        console.log(res1.recordset);
        return res.json(res1.recordset);
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
  console.log('----------------------------- /(root) GET end');
});

app.post('/aspUsers', async (req, res) => {
  // 매개변수와 함께 Stored Procedure 를 실행한 결과값을  조회 및 반환한다.
  // req : { sp_name: 'asp_users_u', user_id = 'gembkkim', ... }
  // res :
  const path = '□ ' + req.body.sp_name + ' ::: ';
  const date = new Date(+new Date() + 3240 * 10000).toISOString().split('T')[0];
  const time = new Date().toTimeString().split(' ')[0];
  console.log(
    'path: ' + path + '--------------------------- ' + date + ' ' + time,
  );
  console.log(path + '>>>>> req.body: ' + JSON.stringify(req.body));

  const pool = await sql.connect(config);

  if (logYn) console.log(path + 'start - argument');
  if (logYn)
    console.log(path + 'sp call : nsp_get_sp_arguments  ' + req.body.sp_name);
  var args = pool
    .request()
    .input('sp_name', sql.TYPES.VarChar, req.body.sp_name)
    .query('nsp_get_sp_arguments @sp_name');
  await args
    .then(res0 => {
      if (logYn)
        console.log(path + 'res0.recordset: ' + JSON.stringify(res0.recordset));
      // return res.json(res0.recordset);
    })
    .catch(err => {
      console.log(path + 'err: ' + err);
    });

  (await args).recordset.forEach(function (item) {
    if (logYn) console.log(item.argument.replace('@', ''));
    let argu = item.argument.replace('@', '');
    console.log('● ' + req.body[argu]);
  });

  if (logYn) console.log(path + 'start');
  try {
    // const { sp_name, user_id } = req.body;
    if (logYn) console.log(path + 'req.body: ', req.body);

    var data = [];

    if (req.body.sp_name === 'asp_users_s') {
      data = pool.request().query(req.body.sp_name);
    } else if (req.body.sp_name === 'asp_users_k') {
      data = pool
        .request()
        .input('user_id', sql.TYPES.VarChar, req.body.user_id)
        .query(req.body.sp_name + ' @user_id');
    } else if (req.body.sp_name === 'asp_users_u') {
      // 1.request 객체 생성
      const request = pool.request();
      // 2.매개변수 생성
      var argu = '';
      var argStr = '';
      (await args).recordset.forEach(function (arg) {
        if (logYn) console.log(arg.argument.replace('@', ''));
        argu = arg.argument.replace('@', '');
        argStr = argStr + arg.argument + ', ';

        // console.log("● " + req.body[argu]);
        // console.log("● " + arg.datatype);

        // console.log(
        //   arg.datatype === "tinyint"
        //     ? sql.TYPES.TinyInt
        //     : arg.datatype === "smallint"
        //     ? sql.TYPES.SmallInt
        //     : arg.datatype === "int"
        //     ? sql.TYPES.Int
        //     : arg.datatype === "bigint"
        //     ? sql.TYPES.BigInt
        //     : arg.datatype === "float"
        //     ? sql.TYPES.Float
        //     : arg.datatype === "real"
        //     ? sql.TYPES.Real
        //     : arg.datatype === "numeric"
        //     ? sql.TYPES.Numeric
        //     : arg.datatype === "smalldatetime"
        //     ? sql.TYPES.SmallDateTime
        //     : arg.datatype === "datetime"
        //     ? sql.TYPES.DateTime
        //     : arg.datatype === "varchar"
        //     ? sql.TYPES.VarChar
        //     : arg.datatype === "char"
        //     ? sql.TYPES.Char
        //     : sql.TYPES.VarChar
        // );

        request.input(
          arg.argument.replace('@', ''),
          arg.datatype === 'tinyint'
            ? sql.TYPES.TinyInt
            : arg.datatype === 'smallint'
            ? sql.TYPES.SmallInt
            : arg.datatype === 'int'
            ? sql.TYPES.Int
            : arg.datatype === 'bigint'
            ? sql.TYPES.BigInt
            : arg.datatype === 'float'
            ? sql.TYPES.Float
            : arg.datatype === 'real'
            ? sql.TYPES.Real
            : arg.datatype === 'numeric'
            ? sql.TYPES.Numeric
            : arg.datatype === 'smalldatetime'
            ? sql.TYPES.SmallDateTime
            : arg.datatype === 'datetime'
            ? sql.TYPES.DateTime
            : arg.datatype === 'varchar'
            ? sql.TYPES.VarChar
            : arg.datatype === 'char'
            ? sql.TYPES.Char
            : sql.TYPES.VarChar,
          req.body[argu],
        );
        // request.input("user_id", sql.TYPES.VarChar, req.body.user_id);
        // request.input("name", sql.TYPES.VarChar, req.body.name);
        // request.input("age", sql.TYPES.Int, req.body.age);
        // request.input("sex_ty", sql.TYPES.VarChar, req.body.sex_ty);
        // request.input("note", sql.TYPES.VarChar, req.body.note);
        // data = request.query(
        //   req.body.sp_name + " " + "@user_id, @name, @age, @sex_ty, @note"
      });
      //
      //
      data = request.query(
        req.body.sp_name + ' ' + argStr.substring(0, argStr.length - 2),
      );
      // console.log(
      //   req.body.sp_name + " " + argStr.substring(0, argStr.length - 2)
      // );
      //
      //
      // data = pool
      //   .request()
      //   .input("user_id", sql.TYPES.VarChar, req.body.user_id)
      //   .input("name", sql.TYPES.VarChar, req.body.name)
      //   .input("age", sql.TYPES.Int, req.body.age)
      //   .input("sex_ty", sql.TYPES.VarChar, req.body.sex_ty)
      //   .input("note", sql.TYPES.VarChar, req.body.note)
      //   .query(req.body.sp_name + " @user_id, @name, @age, @sex_ty, @note");
      //
      //
    } else if (req.body.sp_name === 'asp_users_d') {
      data = pool
        .request()
        .input('user_id', sql.TYPES.VarChar, req.body.user_id)
        .query(req.body.sp_name + ' @user_id');
    }

    console.log('data :' + JSON.stringify(data));

    await data
      .then(res1 => {
        if (logYn) {
          console.log(
            path + 'res1.recordset: ' + JSON.stringify(res1.recordset),
          );
        }
        // return res1.json(res1.recordset);
        return res.json(res1.recordset);
      })
      .catch(err => {
        console.log(path + 'err: ' + err);
      });
    console.log('11-9');
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
  if (logYn) console.log(path + 'end');
});

app.post('/asp', async (req, res) => {
  // 매개변수와 함께 Stored Procedure 를 실행한 결과값을  조회 및 반환한다.
  // req : { sp_name: 'asp_users_u', user_id = 'gembkkim', ... }
  // res :
  const path = '■■■ ' + req.body.sp_name + ' ::: ';
  const date = new Date(+new Date() + 3240 * 10000).toISOString().split('T')[0];
  const time = new Date().toTimeString().split(' ')[0];
  if (logYn || true)
    console.log(path + '--------------------------- ' + date + ' ' + time);
  if (logYn) console.log(path + 'req.body: ' + JSON.stringify(req.body));

  const pool = await sql.connect(config);

  if (logYn)
    console.log(path + 'sp call : zsp_get_sp_arguments  ' + req.body.sp_name);
  var args = pool
    .request()
    .input('sp_name', sql.TYPES.VarChar, req.body.sp_name)
    .query('zsp_get_sp_arguments @sp_name');
  await args
    .then(res0 => {
      if (logYn || true)
        console.log(path + 'res0.recordset: ' + JSON.stringify(res0.recordset));
      // return res.json(res0.recordset);
    })
    .catch(err => {
      console.log(path + 'err: ' + err);
    });

  (await args).recordset.forEach(function (item) {
    if (logYn) console.log(item.argument.replace('@', ''));
    let argu = item.argument.replace('@', '');
    if (logYn) console.log('● ' + req.body[argu]);
  });

  if (logYn) console.log(path + 'start');
  try {
    // const { sp_name, user_id } = req.body;
    if (logYn) console.log(path + 'req.body: ', req.body);

    var data = [];

    // 1.request 객체 생성
    const request = pool.request();
    // 2.매개변수 생성
    var argu = '';
    var argStr = '';
    (await args).recordset.forEach(function (arg) {
      if (logYn) console.log(arg.argument.replace('@', ''));
      argu = arg.argument.replace('@', '');
      argStr = argStr + arg.argument + ', ';

      // console.log("● " + req.body[argu]);
      // console.log("● " + arg.datatype);

      // console.log(
      //   arg.datatype === "tinyint"
      //     ? sql.TYPES.TinyInt
      //     : arg.datatype === "smallint"
      //     ? sql.TYPES.SmallInt
      //     : arg.datatype === "int"
      //     ? sql.TYPES.Int
      //     : arg.datatype === "bigint"
      //     ? sql.TYPES.BigInt
      //     : arg.datatype === "float"
      //     ? sql.TYPES.Float
      //     : arg.datatype === "real"
      //     ? sql.TYPES.Real
      //     : arg.datatype === "numeric"
      //     ? sql.TYPES.Numeric
      //     : arg.datatype === "smalldatetime"
      //     ? sql.TYPES.SmallDateTime
      //     : arg.datatype === "datetime"
      //     ? sql.TYPES.DateTime
      //     : arg.datatype === "varchar"
      //     ? sql.TYPES.VarChar
      //     : arg.datatype === "char"
      //     ? sql.TYPES.Char
      //     : sql.TYPES.VarChar
      // );

      request.input(
        arg.argument.replace('@', ''),
        arg.datatype === 'tinyint'
          ? sql.TYPES.TinyInt
          : arg.datatype === 'smallint'
          ? sql.TYPES.SmallInt
          : arg.datatype === 'int'
          ? sql.TYPES.Int
          : arg.datatype === 'bigint'
          ? sql.TYPES.BigInt
          : arg.datatype === 'float'
          ? sql.TYPES.Float
          : arg.datatype === 'real'
          ? sql.TYPES.Real
          : arg.datatype === 'numeric'
          ? sql.TYPES.Numeric
          : arg.datatype === 'smalldatetime'
          ? sql.TYPES.SmallDateTime
          : arg.datatype === 'datetime'
          ? sql.TYPES.DateTime
          : arg.datatype === 'varchar'
          ? sql.TYPES.VarChar
          : arg.datatype === 'char'
          ? sql.TYPES.Char
          : sql.TYPES.VarChar,
        req.body[argu],
      );
      //request.input("user_id_s", sql.TYPES.VarChar, req.body.user_id_s);
      // request.input("user_id", sql.TYPES.VarChar, req.body.user_id);
      // request.input("name", sql.TYPES.VarChar, req.body.name);
      // request.input("age", sql.TYPES.Int, req.body.age);
      // request.input("sex_ty", sql.TYPES.VarChar, req.body.sex_ty);
      // request.input("note", sql.TYPES.VarChar, req.body.note);
      // data = request.query(
      //   req.body.sp_name + " " + "@user_id, @name, @age, @sex_ty, @note"
    });
    //
    //
    data = request.query(
      req.body.sp_name + ' ' + argStr.substring(0, argStr.length - 2),
    );
    console.log(
      req.body.sp_name + ' ' + argStr.substring(0, argStr.length - 2),
    );
    //
    //
    // data = pool
    //   .request()
    //   .input("user_id", sql.TYPES.VarChar, req.body.user_id)
    //   .input("name", sql.TYPES.VarChar, req.body.name)
    //   .input("age", sql.TYPES.Int, req.body.age)
    //   .input("sex_ty", sql.TYPES.VarChar, req.body.sex_ty)
    //   .input("note", sql.TYPES.VarChar, req.body.note)
    //   .query(req.body.sp_name + " @user_id, @name, @age, @sex_ty, @note");
    //
    //
    await data
      .then(res1 => {
        if (logYn || true) {
          console.log(
            path + 'res1.recordset: ' + JSON.stringify(res1.recordset),
          );
        }
        // return res1.json(res1.recordset);
        return res.json(res1.recordset);
      })
      .catch(err => {
        console.log(path + 'err: ' + err);
      });
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
  if (logYn) console.log(path + 'end');
});

app.post('/post', async (req, res) => {
  // 매개변수와 함께 Stored Procedure 를 실행한 결과값을  조회 및 반환한다.
  // req : { sp_name: 'asp_users_u', user_id = 'gembkkim',  }
  // res :

  console.log('============================= /post POST start');
  try {
    const { user_id } = req.body;
    console.log('Received req.body:', req.body); // user_id 값 로그로 출력
    console.log('Received user_id:', user_id); // user_id 값 로그로 출력

    const pool = await sql.connect(config);

    const data = pool
      .request()
      .input('user_id', sql.TYPES.VarChar, user_id)
      // .query(`select * from  users where user_id like '%' + @user_id + '%'`);
      .query('asp_users_k @user_id');
    // const data = pool.request().query("asp_users_s"); // 프로시저 호출 시
    data
      .then(res1 => {
        console.log('---- /post res1.recordset');
        console.log(res1.recordset);
        return res.json(res1.recordset);
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
  console.log('============================= /post POST end');
});

app.post('/args', async (req, res) => {
  // 사용자 정의 Stored Procedure 의 매개변수 속성값들을 조회 및 반환한다.
  // req : sp_name ex) { sp_name: 'asp_users_u' }
  // res :
  // [ { argument: '@user_id', datatype: 'varchar', length: 32, inout: 'in', prec: 0, scale: 0 },
  //   { argument: '@name', datatype: 'varchar', length: 50, inout: 'in', prec: 0, scale: 0 },
  //   { argument: '@age', datatype: 'int', length: 4, inout: 'in', prec: 10, scale: 0 },
  //   { argument: '@sex_ty', datatype: 'varchar', length: 50, inout: 'in', prec: 0, scale: 0 },
  //   { argument: '@note', datatype: 'varchar', length: 1000, inout: 'in', prec: 0, scale: 0 } ]

  console.log(
    '============================= /args POST start @@@@@rrr@@@@@@@@',
  );
  try {
    const { sp_name } = req.body;
    console.log('Received req.body:', req.body); // user_id 값 로그로 출력
    console.log('Received sp_name:', sp_name); // user_id 값 로그로 출력

    const pool = await sql.connect(config);

    const data = pool
      .request()
      .input('sp_name', sql.TYPES.VarChar, sp_name)
      // .query(`select * from  users where user_id like '%' + @user_id + '%'`);
      .query('nsp_get_sp_arguments @sp_name');
    // const data = pool.request().query("asp_users_s"); // 프로시저 호출 시
    data
      .then(res1 => {
        console.log('---- /args res1.recordset');
        console.log(res1.recordset);
        return res.json(res1.recordset);
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
  console.log('----------------------------- /args POST end');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('🔥 Server listening on', PORT);
});

// app.listen(3000, "0.0.0.0", () => {
//   console.log("🔥 Server listening on 0.0.0.0:3000");
// });
