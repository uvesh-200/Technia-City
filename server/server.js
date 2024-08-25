var mysql = require("mysql");
var cors = require("cors");
var express = require("express");
var bodyparser = require("body-parser");
var multer = require("multer");
var nodemailer = require("nodemailer");
var app = express();
var path = require("path");
var jwt = require("jsonwebtoken");
var dotenv = require("dotenv");

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.listen(process.env.PORT);
app.use("/public", express.static("public"));

const jwt_key = process.env.JWT_KEY;

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
});

const storage = multer.diskStorage({
  destination: path.join(__dirname, "./public/"),
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + path.extname(file.originalname));
  },
});

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) return res.sendStatus(401);

  jwt.verify(token.split("")[1], jwt_key, (err, user) => {
    req.user = user;
    next();
  });
  // console.log(token);
}

app.post("/api/addvideo", (req, res) => {
  let upload = multer({ storage: storage }).single("filename");
  upload(req, res, function (err) {
    if (!req.file) {
      console.log("Not Found");
    } else {
      var title = req.body.Title;
      console.log(title);
      var desc = req.body.Description;
      console.log(desc);
      var amount = req.body.Amount;
      console.log(amount);
      var days = req.body.Days;
      console.log(days);
      var videos = req.file.filename;
      console.log(videos);
      var catid = req.body.Catid;
      console.log(catid);
      var type = req.body.Type;

      const insert =
        "insert into tbl_a_videos (cat_id, v_title, v_description, v_type, v_amt, v_days, v_video) values (?,?,?,?,?,?,?)";
      conn.query(insert, [catid, title, desc, type, amount, days, videos]);
      res.send();
    }
  });
});

app.post("/api/updatevideo", (req, res) => {
  let upload = multer({ storage: storage }).single("filename");
  upload(req, res, function (err) {
    if (!req.file) {
      console.log("Not Found");
    } else {
      var title = req.body.title;
      // console.log(title);
      var desc = req.body.desc;
      // console.log(desc);
      var amount = req.body.amt;
      // console.log(amount);
      var days = req.body.days;
      // console.log(days);
      var videos = req.file.filename;
      // console.log(videos);
      var id = req.body.id;
      // console.log(id);
      var types = req.body.types;
      // console.log(types);
      const update =
        "update tbl_a_videos set v_title=?, v_description=?, v_type=?, v_amt=?, v_days=?, v_video=? where v_id=?";
      conn.query(
        update,
        [title, desc, types, amount, days, videos, id],
        (err, result) => {
          res.send(result);
        }
      );
    }
  });
});

app.post("/api/registration", (req, res) => {
  var name = req.body.Name;
  // console.log(name);
  var number = req.body.Number;
  // console.log(number);
  var dob = req.body.Dob;
  // console.log(dob);
  var email = req.body.Email;
  // console.log(email);
  var password = req.body.Password;
  // console.log(password);

  const ins =
    "insert into tbl_u_reg (r_name, r_email, r_password, r_number, r_dob) values (?,?,?,?,?)";

  conn.query(ins, [name, email, password, number, dob]);
  res.send();
});

app.post("/api/login", (req, res) => {
  var lemail = req.body.LEmail;
  // console.log(lemail);
  var lpassword = req.body.LPassword;
  // console.log(lpassword);

  const sel = "select * from tbl_u_reg where r_email = ? and r_password = ?";
  conn.query(sel, [lemail, lpassword], (error, result) => {
    if (result.length > 0) {
      const token = jwt.sign({ result }, jwt_key, { expiresIn: "2h" });
      // console.log(token);
      // console.log(result);
      res.send({ result, auth: token });
    } else {
      res.send({ message: "Wrong Email or Password" });
    }
  });
});

app.get("/api/profile", (req, res) => {
  var gid = req.query.Id;
  // console.log(gid);

  const ins = "select * from tbl_u_reg where r_id=?";
  conn.query(ins, [gid], (err, result) => {
    // console.log(result);
    res.send(result);
  });
});

app.post("/api/contact", (req, res) => {
  var cnname = req.body.Cnname;
  // console.log(cnname);
  var cnnumber = req.body.Cnnumber;
  // console.log(cnnumber);
  var cnemail = req.body.Cnemail;
  // console.log(cnemail);
  var cnsubject = req.body.Cnsubject;
  // console.log(cnsubject);
  var cnmsg = req.body.Cnmsg;
  // console.log(cnmsg);

  const cins =
    "insert into tbl_u_contact (cn_name, cn_email, cn_number, cn_subject, cn_msg) values (?,?,?,?,?)";
  conn.query(cins, [cnname, cnemail, cnnumber, cnsubject, cnmsg]);
  res.send();
});

app.post("/api/category", (req, res) => {
  const cat = req.body.Category;
  // console.log(cat);

  const cains = "insert into tbl_a_category (cat_name) values (?)";
  conn.query(cains, [cat]);
  res.send();
});

app.post("/api/adminlogin", (req, res) => {
  const catemail = req.body.Email;
  const catPass = req.body.Password;
  // console.log(catemail);
  // console.log(catPass);

  const catsel =
    "select * from tbl_a_login where a_email = ? and a_password = ?";
  conn.query(catsel, [catemail, catPass], (err, result) => {
    if (result.length > 0) {
      // console.log(result);
      res.send(result);
    } else {
      res.send({ message: "Wrong Email or Password" });
    }
  });
});

app.get("/api/viewcat", (req, res) => {
  const get = "select * from tbl_a_category";
  conn.query(get, (err, result) => {
    res.send(result);
  });
});

app.get("/api/viewvideo", (req, res) => {
  const getv = "select * from tbl_a_videos";
  conn.query(getv, (err, result) => {
    res.send(result);
    // console.log(result);
  });
});

app.get("/api/latestvideo", (req, res) => {
  const getv = "select * from tbl_a_videos order by v_id desc limit 9";
  conn.query(getv, (err, result) => {
    res.send(result);
    // console.log(result);
  });
});

app.get("/api/videotable", (req, res) => {
  const get =
    "select a.*, b.* from tbl_a_videos as a, tbl_a_category as b where a.cat_id=b.cat_id";
  conn.query(get, (err, result) => {
    res.send(result);
  });
});

app.get("/api/catcount", (req, res) => {
  const count = "select count(*) as count from tbl_a_category";
  conn.query(count, (err, result) => {
    res.send(result);
  });
});

app.get("/api/vidcount", (req, res) => {
  const count = "select count(*) as count from tbl_a_videos";
  conn.query(count, (err, result) => {
    res.send(result);
  });
});

app.post("/api/deletecat", (req, res) => {
  const id = req.body.id;
  // console.log(id);
  const del = "delete from tbl_a_category where cat_id = ?";
  conn.query(del, [id], (err, result) => {
    res.send(result);
  });
});

app.post("/api/deletevid", (req, res) => {
  const id = req.body.id;
  // console.log(id);
  const del = "delete from tbl_a_videos where v_id = ?";
  conn.query(del, [id], (err, result) => {
    res.send(result);
  });
});

app.post("/api/editcat", (req, res) => {
  const id = req.body.id;
  const sel = "select * from tbl_a_category where cat_id = ?";
  conn.query(sel, [id], (err, result) => {
    res.send(result);
  });
});

app.post("/api/editvid", (req, res) => {
  const id = req.body.id;
  const sel = "select * from tbl_a_videos where v_id = ?";
  conn.query(sel, [id], (err, result) => {
    res.send(result);
  });
});

app.post("/api/updatecat", (req, res) => {
  const catname = req.body.Catname;
  const id = req.body.id;
  const update = "update tbl_a_category set cat_name = ? where cat_id = ?";
  conn.query(update, [catname, id], (err, result) => {
    res.send(result);
  });
});

app.get("/api/videodetails", (req, res) => {
  const id = req.query.id;
  const sel = "select * from tbl_a_videos where v_id = ?";
  conn.query(sel, [id], (err, result) => {
    res.send(result);
  });
});

app.post("/api/subscribe", (req, res) => {
  const amt = req.body.Amt;
  const vid = req.body.vid;
  const rid = req.body.rid;
  const days = req.body.days;
  const orderid = req.body.orderid;
  const cdate = new Date();
  const date = new Date(cdate.getTime() + days * 24 * 60 * 60 * 1000);
  const edate = date.toISOString();

  const ins =
    "insert into tbl_a_subscription (sub_price, sub_start, v_id, r_id, sub_end, merchant_order_id) values (?,?,?,?,?,?)";
  conn.query(ins, [amt, cdate, vid, rid, edate, orderid], (err, result) => {
    if (result) {
      res.send(result);
    } else {
      res.send({ message: "Something went wrong" });
    }
  });
});

app.get("/api/subscriptionvideos", verifyToken, (req, res) => {
  const id = req.query.id;
  // console.log("id is ", id);
  const select =
    "SELECT a.*, b.* from tbl_a_subscription as a, tbl_a_videos as b WHERE a.v_id=b.v_id and r_id=?";
  conn.query(select, [id], (err, result) => {
    res.send(result);
    // console.log(result);
  });
});

app.post("/api/forgotpass", (req, res) => {
  const email = req.body.Email;
  const msg = `<div><h1>This is demo </h1></div>`;
  const sel = "select * from tbl_u_reg where r_email = ?";
  conn.query(sel, [email], (err, result) => {
    if (result.length > 0) {
      var uemail = result[0].r_email;
      var pass = result[0].r_password;

      const Smtp = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "techniacityit@gmail.com",
          pass: "nfszupbphatqwebl",
        },
      });

      // console.log(msg);
      const message = {
        from: "techniacityit@gmail.com",
        to: email,
        subject: "Account Password",
        html: `<p>Hello ${uemail},</p>
        <p>We hope this email finds you well. You requested a password for your account.</p>
        <p>If you did not initiate this request, you can safely ignore this email. No changes will be made to your account.</p>
        <p>The password of your account is <br><h2>${pass}</h2></p>
        <p>Please do not share this email to anyone for your account security purposes.</p>
        <i>If you have any questions or concerns, please contact our support team.</i>
        <p>Thank you!</p>`,
      };

      Smtp.sendMail(message, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Email Sent to your registered Email Id");
        }
      });
    } else {
      res.send({ message: "Your Email ID is not Registered" });
    }
  });
});

app.get("/api/subscribevideos", (req, res) => {
  const sel =
    "SELECT a.*, b.*, c.* from tbl_a_subscription as a, tbl_a_videos as b, tbl_u_reg as c WHERE a.v_id=b.v_id and a.r_id=c.r_id";
  conn.query(sel, (err, result) => {
    res.send(result);
  });
});

app.get("/api/search", (req, res) => {
  const search = req.query.text;
  // console.log(search);
  const sel =
    "select * from tbl_a_videos where v_title like '%" + search + "%'";
  conn.query(sel, [search], (err, result) => {
    res.send(result);
    // console.log(result);
  });
});

app.post("/api/updatepassword", (req, res) => {
  const npass = req.body.Newpass;
  // console.log(npass);
  const id = req.body.id;
  // console.log(id);
  const update = "update tbl_u_reg set r_password=? where r_id=?";
  conn.query(update, [npass, id], (err, result) => {
    res.send(result);
  });
});

app.get("/api/subscribevidcount", (req, res) => {
  const count = "select count(*) as count from tbl_a_subscription";
  conn.query(count, (err, result) => {
    res.send(result);
  });
});

app.get("/api/subvideosearch", (req, res) => {
  const search = req.query.searches;
  const sel =
    "SELECT a.*, b.*, c.* from tbl_a_subscription as a, tbl_a_videos as b, tbl_u_reg as c WHERE a.v_id=b.v_id and a.r_id=c.r_id and r_name like ? ";
  conn.query(
    sel,
    [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`],
    (err, result) => {
      res.send(result);
      // console.log(search);
      // console.log(result);
    }
  );
});

app.get("/api/feedback", (req, res) => {
  const sel = "select * from tbl_u_contact";
  conn.query(sel, (err, result) => {
    res.send(result);
  });
});

app.post("/api/deletefeedback", (req, res) => {
  const id = req.body.id;
  const del = "delete from tbl_u_contact where cn_id=?";
  conn.query(del, [id], (err, result) => {
    res.send(result);
  });
});

app.get("/api/viewfeedback", (req, res) => {
  const id = req.query.id;
  const sel = "select * from tbl_u_contact where cn_id=?";
  conn.query(sel, [id], (err, result) => {
    res.send(result);
  });
});

app.post("/api/analyticsvideocount", (req, res) => {
  const start = req.body.start;
  const end = req.body.end;
  const query =
    "select v.*,s.*, count(s.r_id) as count from tbl_a_videos as v left join tbl_a_subscription as s using(v_id) where s.sub_start between ? and ? group by v.v_id order by count asc;";
  conn.query(query, [start, end], (err, result) => {
    res.send(result);
  });
});

app.get("/api/suggest", (req, res) => {
  const id = req.query.id;
  // console.log(id);
  const sel = "select * from tbl_a_subscription where r_id = ?";
  conn.query(sel, [id], (err, result1) => {
    if (result1.length > 0) {
      const query =
        "select c.cat_id from tbl_a_subscription as s left join tbl_a_videos as v using(v_id) left join tbl_a_category as c using(cat_id) where r_id = ?";
      conn.query(query, [id], (err, result) => {
        let words = [];
        for (var i = 0; i < result.length; i++) {
          words.push(result[i]);
        }
        res.send(words);
      });
    } else {
      const sel = "select * from tbl_a_videos";
      conn.query(sel, (err, result2) => {
        res.send(result2);
      });
    }
  });
});

app.get("/api/suggestVideos", (req, res) => {
  const catid = req.query.catid;
  console.log(catid);

  const sel = "select * from tbl_a_videos where cat_id in (?)";
  conn.query(sel, [catid], (err, result1) => {
    // res.send(result);
    // console.log(result);
    const nsel = "select * from tbl_a_videos where cat_id not in (?)";
    conn.query(nsel, [catid], (err, result2) => {
      res.send({ sel: result1, nsel: result2 });
    });
  });
});

app.post("/api/resubscribe", (req, res) => {
  const id = req.body.sid;
  const days = req.body.days;
  const oid = req.body.orderid;
  // console.log(oid);
  const cdate = new Date();
  const date = new Date(cdate.getTime() + days * 24 * 60 * 60 * 1000);
  const edate = date.toISOString();
  // console.log(edate);
  // console.log(cdate);

  const update =
    // update tbl_a_videos set v_title=?, v_description=?, v_type=?, v_amt=?, v_days=?, v_video=? where v_id=?
    "update tbl_a_subscription set sub_start = ?, sub_end = ?, merchant_order_id = ? where sub_id = ?";
  conn.query(update, [cdate, edate, oid, id], (err, result) => {
    res.send(result);
    // console.log(result);
  });
  // const email = req.body.email;
  // const Smtp = nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  //   port: 587,
  //   secure: false,
  //   auth: {
  //     user: "techniacityit@gmail.com",
  //     pass: "nfszupbphatqwebl",
  //   },
  // });

  // console.log(msg);
  // const message = {
  //   from: "techniacityit@gmail.com",
  //   to: "techniacityit@gmail.com",
  //   subject: "Video Expired",
  //   html: `<p>Hello ${email},</p>
  //   <p>Your Video is Expired So Kindly Subscribe using this link <a href="http://localhost:3000/login" target="_blank">Click here to resubscribe</a></p>
  //   <i>If you have any questions or concerns, please contact our support team.</i>
  //   <p>Thank you!</p>`,
  // };

  // Smtp.sendMail(message, (err, info) => {
  //   if (err) {
  // console.log(err);
  //   } else {
  //     res.send("Email Sent to your registered Email Id");
  //   }
  // });
});

app.get("/api/chatbot", (req, res) => {
  const input = req.query.input;
  const sel =
    "select * from tbl_a_question where q_question like '%" + input + "%'";
  conn.query(sel, [input], (err, result) => {
    res.send(result[0]);
    // console.log(result[0]);
  });
});

app.post("/api/chatbotsubscribedcount", (req, res) => {
  const rid = req.body.rid;
  // console.log(rid);
  const sel =
    "select count(v_id) as count from tbl_a_subscription where r_id = ?";
  conn.query(sel, [rid], (err, result1) => {
    const val =
      "SELECT s.v_id,v.v_title from tbl_a_subscription as s left join tbl_a_videos as v USING(v_id) where r_id=?";
    conn.query(val, [rid], (err, result2) => {
      res.send({ count: result1, value: result2 });
    });
  });
});

app.post("/api/newinput", (req, res) => {
  const newinput = req.body.newinput;
  // console.log(newinput)
  const ins = "insert into tbl_a_question (q_question) values (?)";
  conn.query(ins, [newinput], (err, result) => {
    res.send(result);
  });
});

app.get("/api/chatbotquestions", (req, res) => {
  const sel = "select * from tbl_a_question where q_response = ''";
  conn.query(sel, (err, result) => {
    res.send(result);
  });
});

app.post("/api/deleteques", (req, res) => {
  const id = req.body.id;
  const del = "delete from tbl_a_question where q_id = ?";
  conn.query(del, [id], (err, result) => {
    res.send(result);
  });
});

app.post("/api/editresponse", (req, res) => {
  const id = req.body.id;
  const sel = "select * from tbl_a_question where q_id = ?";
  conn.query(sel, [id], (err, result) => {
    res.send(result);
  });
});

app.post("/api/updateresponse", (req, res) => {
  const id = req.body.id;
  const response = req.body.response;
  const update = "update tbl_a_question set q_response = ? where q_id =?";
  conn.query(update, [response, id], (err, result) => {
    res.send(result);
  });
});

app.get("/api/piechart", (req, res) => {
  const sel =
    "select v.v_title as name,s.*, count(s.r_id) as count from tbl_a_videos as v left join tbl_a_subscription as s using(v_id) group by v.v_id order by count";
  conn.query(sel, (err, result) => {
    res.json(result);
    // console.log(result);
  });
});

app.post("/api/watchlater", (req, res) => {
  const rid = req.body.rid;
  const vid = req.body.vid;
  const sel = "select w_id from tbl_u_watch where r_id= ? and v_id=?";
  conn.query(sel, [rid, vid], (err, result) => {
    // res.send(result);
    // console.log("result id" + result);
    if (result.length === 0) {
      const ins = "insert into tbl_u_watch (r_id,v_id) values (?,?)";
      conn.query(ins, [rid, vid], (err, result1) => {
        res.send(result1);
        // console.log(result1);
      });
    } else {
      res.send({ message: "video is already in watch later" });
    }
  });
});

app.get("/api/watchlatervideos", (req, res) => {
  const rid = req.query.rid;
  // console.log(rid);
  const sel =
    "SELECT a.*, b.* from tbl_u_watch as a, tbl_a_videos as b WHERE a.v_id=b.v_id and r_id=?";
  conn.query(sel, [rid], (err, result) => {
    res.send(result);
    // console.log(result);
  });
});

app.post("/api/removewatchlatervideos", (req, res) => {
  const id = req.body.id;
  const rid = req.body.rid;
  // console.log(id);
  // console.log(rid);
  const del = "delete from tbl_u_watch where v_id = ? and r_id = ?";
  conn.query(del, [id, rid], (err, result) => {
    res.send(result);
  });
});

app.get("/api/getsubscibed", (req, res) => {
  const id = req.query.id;
  const sel = "select v_id from tbl_a_subscription where r_id = ?";
  conn.query(sel, [id], (err, result) => {
    res.send(result);
    console.log(result);
  });
});

app.get("/api/barchart", (req, res) => {
  const sel =
    "SELECT monthname(sub_start) as month, SUM(sub_price) as price FROM tbl_a_subscription GROUP BY monthname(sub_start) ORDER BY month(sub_start)";
  conn.query(sel, (err, result) => {
    res.send(result);
    console.log(result);
  });
});

app.post("/api/history", (req, res) => {
  const id = req.body.id;
  // console.log(id);
  const rid = req.body.rid;
  // console.log(rid);
  const ctime = new Date();
  const tim = new Date().getTime();
  // const hour = ctime.getHours();
  // const minute = ctime.getMinutes();
  // const second = ctime.getSeconds();
  // const time = `${hour}:${minute}:${second}`;

  const ins =
    "insert into tbl_u_history (v_id,r_id,h_time,h_date) values (?,?,?,?)";
  conn.query(ins, [id, rid, tim, ctime], (err, result) => {
    res.send(result);
  });
});

app.get("/api/historyvideos", (req, res) => {
  const rid = req.query.rid;
  // console.log(rid);
  const sel =
    "SELECT DISTINCT a.*, b.* FROM tbl_u_history AS a JOIN tbl_a_videos AS b ON a.v_id = b.v_id JOIN (SELECT v_id, MAX(h_time) AS latest_time FROM tbl_u_history WHERE r_id = ?GROUP BY v_id) AS c ON a.v_id = c.v_id AND a.h_time = c.latest_time ORDER BY a.h_time DESC;";

  conn.query(sel, [rid], (err, result) => {
    res.send(result);
    console.log(result);
  });
});

app.post("/api/removehistoryvideos", (req, res) => {
  const id = req.body.id;
  const rid = req.body.rid;
  // console.log(id);
  // console.log(rid);
  const del = "delete from tbl_u_history where v_id = ? and r_id = ?";
  conn.query(del, [id, rid], (err, result) => {
    res.send(result);
  });
});

app.get("/api/registeredemails", (req, res) => {
  const sel = "select r_email from tbl_u_reg";
  conn.query(sel, (err, result) => {
    res.send(result);
  });
});

app.post("/api/like", (req, res) => {
  const id = req.body.id;
  const rid = req.body.rid;
  // console.log(id);
  // console.log(rid);
  const sel = "select * from tbl_u_likes where v_id = ? and r_id = ?";
  conn.query(sel, [id, rid], (err, result) => {
    console.log("result is " + result);
    if (result.length > 0) {
      // const update =
      //   "update tbl_u_likes set li_likes = li_likes + 1 where v_id = ? and r_id = ?";
      // conn.query(update, [id, rid], (err, result2) => {
      //   console.log("update");
      res.send({ message: "you have already liked this video" });
      // });
    } else {
      const ins = "insert into tbl_u_likes (v_id,r_id,li_likes) values (?,?,1)";
      conn.query(ins, [id, rid], (err, result1) => {
        console.log("insert");
        res.send(result1);
      });
    }
  });
});

app.get("/api/likecount", (req, res) => {
  const count = "select v_id,count(*) as count from tbl_u_likes group by v_id";
  conn.query(count, (err, result) => {
    res.send(result);
    // console.log(result)
  });
});

conn.connect(function (err) {
  if (err) throw err;
  console.log("Connection Successfull");
});
