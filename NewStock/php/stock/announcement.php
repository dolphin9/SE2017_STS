<?php
require "checkstockinfodata.php";
require "../sqlconnect.php";
$stockid = $_POST["stockid"];
$title = htmlspecialchars($_POST["title"]);
$text = htmlspecialchars($_POST["text"]);
$type = $_POST["type"];
$filename = md5($title);
$return = true;
if ($title == null || !checkTitle($title))
{
    $return = false;
    $error = "标题不符合规范";
}
if ($type == "announcement")
    $type = "note";
else if ($type != "news")
{
    $return = false;
    $error = "发布类型错误";
}
if ($return)
{
    $mysqli = getSQLConnect();
    $stmt = $mysqli->prepare("select 1 from announcement where title = ? limit 1");
    $stmt->bind_param("s", $title);
    $exe = $stmt->execute();
    if ($exe == false)
    {
        $return = false;
        $error = "数据库操作出错";
    }
    if ($return)
    {
        $res = $stmt->get_result();
        $data = $res->fetch_all(MYSQLI_ASSOC);
        if (count($data) == 0)
            $return = true;
        else
        {
            $return = false;
            $error = "标题已经被使用";
        }
    }
    if ($return)
    {
        $filepath = "../../announcement/" . $filename . ".html";
        $file = fopen($filepath, "w");
        if ($file == false)
        {
            $return = false;
            $error = "发布信息失败";
        }
        else
        {
            $html = "<html>\n<meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\" />\n<body>\n<h1>" . $title . "</h1>\n<p>" . $text . "</p>\n</body>\n</html>\n";
            fwrite($file, $html);
            fclose($file);
            $href = "announcement/" . $filename . ".html";
            $stmt = $mysqli->prepare("insert into announcement (stockid, title, href, type) values (?,?,?,?)");
            $stmt->bind_param("ssss", $stockid, $title, $href, $type);
            $return = $stmt->execute();
            if (!$return)
                $error = "发布信息失败";
        }
    }
    $stmt->close();
    freeSQLConnect($mysqli);
}
$done = array();
$done['result'] = $return;
$done['info'] = $error;
echo json_encode($done);
?>
