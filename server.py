#!/usr/bin/env python2.7
# Populate dropdown even after error occurs
"""
Columbia's COMS W4111.001 Introduction to Databases
Example Webserver

To run locally:

    python server.py

Go to http://localhost:8111 in your browser.

A debugger such as "pdb" may be helpful for debugging.
Read about it online.
"""
#from create2api import Create2
import time
import os
from flask import Flask, request, render_template, g, session,redirect, Response, send_from_directory
from navigator import Navigator
# from __future__ import print_function
import sys


tmpl_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'public')
app = Flask(__name__, template_folder=tmpl_dir, static_url_path='/public')
bot = 0

# DATABASEURI = "postgresql://np2544:intro2db@w4111vm.eastus.cloudapp.azure.com:5432/w4111"
# engine = create_engine(DATABASEURI)
# app.secret_key = os.urandom(24)

# engine.execute("""CREATE TABLE IF NOT EXISTS test (
#   id serial,
#   name text
# );""")
# engine.execute("""INSERT INTO test(name) VALUES ('grace hopper'), ('alan turing'), ('ada lovelace');""")


@app.before_request
def before_request():

#   try:
#     g.conn = engine.connect()


#   except:
#     print "uh oh, problem connecting to database"
#     import traceback; traceback.print_exc()
#     g.conn = None
    pass

@app.teardown_request
def teardown_request(exception):

#   try:
#     g.conn.close()
#     logout()
#     session.pop('username', None)
#     session.clear()
#   except Exception as e:
    pass




# @app.after_request
# def after_request():
#     session.clear()

#
# @app.route is a decorator around index() that means:
#   run index() whenever the user tries to access the "/" path using a GET request
#
# If you wanted the user to go to, for example, localhost:8111/foobar/ with POST or GET then you could use:
#
#       @app.route("/foobar/", methods=["POST", "GET"])
#
# PROTIP: (the trailing / in the path is important)
#
# see for routing: http://flask.pocoo.org/docs/0.10/quickstart/#routing
# see for decorators: http://simeonfranklin.com/blog/2012/jul/1/python-decorators-in-12-steps/
#
@app.route('/<path:path>')
def send_js(path):
    return send_from_directory('public', path)

@app.route('/')
def index():
    return render_template("index.html");
    #return app.send_static_file('index.html')

@app.route('/basic/')
def basic():
    bot = Navigator.Navigator()
    bot.startSafe();
    bot.drive(0,0);
    time.sleep(5);
    bot.destroy()
    return 'wow'


# TRY WITH SLASH AT END OF ROUTE
@app.route('/api/robot/start')
def start():
    bot = Navigator.Navigator();
    bot.startSafe();
    return "Success"

@app.route('/api/robot/stop')
def stop():
    bot.stop();

@app.route('/api/robot/drive', methods=['POST'])
def drive():
    # bot.startSafe();
    content = request.get_json(silent=False)
    x = content["x"]
    y = content["y"]
    bot.drive(x,y);
    

    
    

# @app.route('/another')
# def another():
#   return render_template("another.html")

# @app.route('/signup')
# def signup():
#      if 'username' in session:
#         return redirect('/')
#      cursor = g.conn.execute("SELECT tname FROM teams")
#      names = []
#      for result in cursor:
#        names.append(result['tname'])  # can also be accessed using result[0]
#      cursor.close()
#      context = dict(data = names)
#      return render_template("signup.html", **context)


# @app.route('/add', methods=['POST'])
# def add():
#   name = request.form['name']
#   email = request.form['email']
#   password = request.form['password']
#   team = request.form['team']
#   cursor=g.conn.execute("select * from teams where tname = %s",team)
#   m=cursor.fetchone()
#   cursor=g.conn.execute("select email from users where email = %s",email)
#   count =0
#   for row in cursor:
#     count+=1
#   if count > 0:
#       cursor = g.conn.execute("SELECT tname FROM teams")
#       names = []
#       for result in cursor:
#         names.append(result['tname'])  # can also be accessed using result[0]
#       cursor.close()
#       print "error"
#       return render_template('/signup.html',error="Email id already exists",data=names)
#   print m[0]
#   g.conn.execute('INSERT INTO users VALUES (%s,%s,%s,%s)', email,name,password,m[0])
#   # print name
#   session['username']=email
#   return redirect('/')


# @app.route('/login')
# def login():
#     if 'username' in session:
#         return redirect("/")
#     return render_template("login.html")


# @app.route('/log',methods=['POST'])
# def log():
#     user=request.form['email']
#     password=request.form['password']
#     print password
#     cursor=g.conn.execute("select * from users where email = %s and password= %s",user,password)
#     m=cursor.fetchone()
#     if m is None:
#         return render_template("login.html",error="details not correct")
#     session['username']=user
#     print session['username']

#     # return render_template('/index.html',user=user)
#     return redirect("/")


# @app.route('/logout')
# def logout():
#     # remove the username from the session if it's there
#     mytime= strftime("%H:%M:%S", gmtime())
#     g.conn.execute("update users set ts=%s where email = %s",mytime,session['username'])
#     session.pop('username', None)
#     return render_template('/index.html')


# @app.route('/team_page/<tname>')
# def team_page(tname):
#     #return ('you asked for question{0}'.format(question_id))

#     #Get Team Details with team name
#     #Get Player Details with team id
#     #Get Manager Details with team id
#     #Find the league to which the team belongs
#     #How many matches the team has played!?
#     #Which matches has the team won?
#     #Open team_page.html with all required values
#     print tname
#     cursor=g.conn.execute("select * from teams where tname = %s",tname)
#     m=cursor.fetchone()
#     team_id=m['team_id']
#     stadium=m['stadium']
#     league_id=m['league_id']
#     manager_id=m['manager_id']
#     print stadium

#     cursor=g.conn.execute("select name from people where pid in (select pid from players where team_id = %s)",team_id)
#     player_names=[]
#     for result in cursor:
#         player_names.append(result['name'])
#     print player_names

#     cursor=g.conn.execute("select name from people where pid = %s",manager_id)
#     p=cursor.fetchone()
#     manager_name=p['name']
#     print manager_name

#     cursor=g.conn.execute("select lname from leagues where league_id = %s",league_id)
#     p=cursor.fetchone()
#     league_name=p['lname']
#     print league_name

#     cursor=g.conn.execute("select count(*) from matches where team_id1=%s or team_id2= %s",team_id,team_id)
#     p=cursor.fetchone()
#     no_mat_played=p[0]
#     print no_mat_played

#     cursor=g.conn.execute("select count(*) from matches where winner_team_id=%s",team_id)
#     p=cursor.fetchone()
#     no_mat_win=p[0]
#     print no_mat_win

#     #Getting Match Details
#     cursor=g.conn.execute("select t1.tname, t2.tname, x.score from teams t1, teams t2, (select team_id1,team_id2,score from matches where team_id1=%s or team_id2=%s)x where t1.team_id=x.team_id1 and t2.team_id=x.team_id2",team_id,team_id)
#     match_t1=[]
#     match_t2=[]
#     match_sc=[]

#     for result in cursor:
#         match_t1.append(result[0])
#         match_t2.append(result[1])
#         match_sc.append(result[2])
#     print match_t1
#     print match_t2
#     print match_sc
#     cursor.close()
#     x,y=information()

#     context=dict(stadium=stadium,player=player_names,manager_name=manager_name,league_name=league_name,no_mat_played=no_mat_played,no_mat_win=no_mat_win,data=x,league=y,tname=tname,match_t1=match_t1,match_t2=match_t2,score=match_sc,n=len(match_t1))

#     return render_template("team.html", **context)


# @app.route('/league_page/<lname>')    #int has been used as a filter that only integer will be passed in the url otherwise it will give a 404 error
# def league_page(lname):
#     print "hello league"
#     print lname
#     cursor=g.conn.execute("select * from leagues where lname = %s",lname)
#     m=cursor.fetchone()
#     league_id=m['league_id']
#     country=m['country']
#     level=m['level']
#     cursor=g.conn.execute("select tname from teams where league_id = %s",league_id)
#     team_names=[]
#     for result in cursor:
#         team_names.append(result['tname'])
#     print team_names
#     cursor.close()
#     x,y=information()

#     cursor=g.conn.execute("select * from usersfollowleagues where email = %s and league_id = %s",session['username'],league_id)
#     m=cursor.fetchone()
#     if m is not None:
#         followed=1
#     else:
#         followed=0
#     context=dict(data=x,league=y,lname=lname,country=country,level=level,teams=team_names,followed=followed)
#     return render_template("league.html",**context)


# @app.route('/player_page/<pname>')
# def player_page(pname):
#     print pname
#     cursor=g.conn.execute("select pid from people where name = %s",pname)
#     m=cursor.fetchone()
#     player_id=m[0]
#     cursor=g.conn.execute("select * from players where pid = %s",player_id)
#     m=cursor.fetchone()
#     goals=m['goals']
#     position=m['type']
#     num=m['num']
#     cursor = g.conn.execute("select tname from teams where team_id=%s",m['team_id'])
#     m=cursor.fetchone()
#     tname=m[0]

#     cursor.close()
#     x,y=information()

#     context=dict(data=x,league=y,goals=goals,position=position,num=num,tname=tname,pname=pname)
#     return render_template("player.html",**context)


# @app.route('/player_search')
# def player_search_first():
#     x,y=information()
#     context=dict(data=x,league=y,pname=[])
#     return render_template("player_search.html",**context)


# @app.route('/player_search',methods=['POST'])
# def player_search():
#     player_name = request.form['name']
#     pname_flag=bool(request.form.get('name', False))
#     print pname_flag
#     if pname_flag:
#       print player_name
#       pn="%"+player_name+"%"
#       print pn

#     age_lb=request.form['age_lo']
#     age_ub=request.form['age_hi']

#     goal_lb=request.form['goal_lo']
#     goal_ub=request.form['goal_hi']

#     print age_lb
#     print age_ub
#     print goal_lb
#     print goal_ub

#     player_pos=request.form['position']
#     position_flag=bool(request.form.get('position', False))

#     if position_flag:
#       print player_pos
#       pp="%"+player_pos+"%"
#       print pp

#     #No condition selected. i.e All Players
#     cursor=g.conn.execute("select name from people where age>=(%s) and age<(%s) and pid in (select pid from players where goals>=(%s) and goals<(%s))",int(age_lb),int(age_ub),int(goal_lb),int(goal_ub))

#     if pname_flag and position_flag:
#       cursor=g.conn.execute("select name from people where name ilike (%s) and age>=(%s) and age<(%s) and pid in (select pid from players where goals>=(%s) and goals<(%s) and type ilike (%s))",pn,int(age_lb),int(age_ub),int(goal_lb),int(goal_ub),pp)
#     elif pname_flag and not position_flag:
#       cursor=g.conn.execute("select name from people where name ilike (%s) and age>=(%s) and age<(%s) and pid in (select pid from players where goals>=(%s) and goals<(%s))",pn,int(age_lb),int(age_ub),int(goal_lb),int(goal_ub))
#     elif not pname_flag and position_flag:
#       cursor=g.conn.execute("select name from people where age>=(%s) and age<(%s) and pid in (select pid from players where goals>=(%s) and goals<(%s) and type ilike (%s))",int(age_lb),int(age_ub),int(goal_lb),int(goal_ub),pp)

#     pname=[]
#     for result in cursor:
#         pname.append(result['name'])

#     cursor.close()
#     print pname
#     x,y=information()
#     context=dict(data=x,league=y,pname=pname)
#     return render_template("player_search.html",**context)


# @app.route('/follow/<lname>')
# def follow(lname):
#     print lname
#     print session['username']
#     cursor=g.conn.execute("select league_id from leagues where lname = %s",lname)
#     lid=cursor.fetchone()
#     lid=lid['league_id']
#     print lid
#     g.conn.execute("insert into usersfollowleagues values (%s,%s)",session['username'],lid)
#     path="/league_page/" + lname
#     return redirect(path)


# @app.route('/followed')
# def followed():
#     print session['username']
#     cursor=g.conn.execute("select lname,league_id from leagues where league_id in (select league_id from usersfollowleagues where email = %s)",session['username'])
#     leagues=[]
#     league_id=[]
#     for m in cursor:
#         leagues.append(m[0])
#         league_id.append(m[1])

#     print leagues
#     print league_id
#     maxteam=[]
#     maxmanage=[]
#     league_info=[]
#     for l in league_id:
#         cursor=g.conn.execute("select t.tname as team_name ,p.name as Manager_name from (select * from teams where league_id= %s) t, People p,(select team_id, count(team_id) as tcount from Users group by team_id order by tcount DESC) res where res.team_id=t.team_id and p.pid=t.manager_id LIMIT 1",l)
#         m=cursor.fetchone()
#         if not m:
#             print "M IS EMPTY"
#         else:
#             maxteam.append(m[0])
#             maxmanage.append(m[1])
#         cursor=g.conn.execute("select t.tname, avg(p.age) from (select * from teams where league_id=%s) t, People p, Players pl where p.pid=pl.pid and pl.team_id=t.team_id group by t.tname",l)
#         # team_name=[]
#         # team_age=[]
#         league_dict=dict()
#         for m in cursor:
#             team_name=m[0]
#             team_age=m[1]
#             if team_name:
#               league_dict[team_name]=team_age

#         if not league_dict:
#                 print "entered in league_dict check"

#         league_info.append(league_dict)
#         print league_dict
#         print maxteam
#         print maxmanage

#     print "League info is"
#     print league_info
#     x,y=information()
#     context=dict(data=x,league=y,followed=leagues,maxteam=maxteam,maxmanage=maxmanage,league_info=league_info)

#     return render_template("followed.html",**context)


# @app.route('/manager_page/<mname>')
# def manager_page(mname):
#     print mname
#     cursor=g.conn.execute("select * from people where name=%s",mname)
#     m=cursor.fetchone()
#     age=m['age']
#     nationality=m['nationality']
#     pid=m['pid']

#     cursor=g.conn.execute("select * from managers where pid=%s",pid)
#     m=cursor.fetchone()
#     badge=m['badge']
#     team_id=m['team_id']
#     cursor=g.conn.execute("select tname from teams where team_id=%s",team_id)
#     m=cursor.fetchone()
#     tname=m[0]

#     x,y=information()
#     context=dict(data=x,league=y,mname=mname,tname=tname,badge=badge,age=age,nationality=nationality)
#     return render_template("manager.html",**context)


# def information():
#     cursor = g.conn.execute("SELECT tname FROM teams")
#     names = []
#     for result in cursor:
#       names.append(result['tname'])  # can also be accessed using result[0]

#     cursor = g.conn.execute("SELECT lname FROM leagues")
#     lnames = []
#     for result in cursor:
#       lnames.append(result['lname'])
#     cursor.close()
#     return names,lnames

if __name__ == "__main__":
  import click

  @click.command()
  @click.option('--debug', is_flag=True)
  @click.option('--threaded', is_flag=True)
  @click.argument('HOST', default='0.0.0.0')
  @click.argument('PORT', default=8111, type=int)

  def run(debug, threaded, host, port):

    HOST, PORT = host, port
    print "running on %s:%d" % (HOST, PORT)
    sys.path.append('/Users/Siri/Documents/ms/Fall2016/yhack/r2d2/navigator')
    app.run(host=HOST, port=PORT, debug=True, threaded=threaded)


  run()
