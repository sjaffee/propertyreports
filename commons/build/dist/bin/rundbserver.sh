#!/bin/sh

INSTALL_HOME="$1"


USAGE="Usage: rundbserver.sh <install_home_dir> <properties> "

if [ -z "$INSTALL_HOME" ] ; then
	echo "Error: No Vincio install home defined."
	echo $USAGE
	exit 1
fi


LIB=$INSTALL_HOME/lib
# assume the properties files are in INSTALL_HOME/etc
CLASSPATH=$LIB:$INSTALL_HOME/etc:$INSTALL_HOME

# OS specific support.
cygwin=false;

case "`uname`" in
  CYGWIN*) cygwin=true ;;

esac

# For Cygwin, ensure paths are in UNIX format before anything is touched
if $cygwin ; then
  [ -n "$JAVA_HOME" ] &&
    JAVA_HOME=`cygpath --unix "$JAVA_HOME"`
  [ -n "$CLASSPATH" ] &&
    CLASSPATH=`cygpath --path --unix "$CLASSPATH"`
fi

if [ -z "$JAVA_HOME" ] ; then
	if [ -d "$INSTALL_HOME/jre" ] ; then
		JAVA_HOME="$INSTALL_HOME/jre"
	fi   
fi

if [ -n "$JAVA_HOME"  ] ; then
    if [ -x "$JAVA_HOME/jre/sh/java" ] ; then 
      # IBM's JDK on AIX uses strange locations for the executables
      JAVACMD="$JAVA_HOME/jre/sh/java"
    else
      JAVACMD="$JAVA_HOME/bin/java"
    fi
else
    JAVACMD=`which java 2> /dev/null `
    if [ -z "$JAVACMD" ] ; then 
        JAVACMD=java
    fi
fi

 
if [ ! -x "$JAVACMD" ] ; then
  echo "Error: JAVA_HOME is not defined correctly."
  echo "  Cannot execute $JAVACMD"
  exit 1
fi

if [ -n "$CLASSPATH" ] ; then
  LOCALCLASSPATH="$CLASSPATH"
fi

for i in "${LIB}"/*.jar
do
  if [ -f "$i" ] ; then
    if [ -z "$LOCALCLASSPATH" ] ; then
      LOCALCLASSPATH="$i"
    else
      LOCALCLASSPATH="$i":"$LOCALCLASSPATH"
    fi
  fi
done


# For Cygwin, switch paths to Windows format before running java
if $cygwin; then
  JAVA_HOME=`cygpath --windows "$JAVA_HOME"`
  CLASSPATH=`cygpath --path --windows "$CLASSPATH"`
  LOCALCLASSPATH=`cygpath --path --windows "$LOCALCLASSPATH"`
  CYGHOME=`cygpath --windows "$HOME"`
fi

 
ARGS=""
index=0
for arg in $@
do
  index=`expr $index + 1`
  if [ $index -gt 1 ] ; then
  	ARGS="$ARGS $arg"  	
  fi
done

cd $INSTALL_HOME

CMD="$JAVACMD -Xmx1024M -Djava.rmi.server.codebase="file://$INSTALL_HOME/lib/commons.jar" -classpath $LOCALCLASSPATH com.ali.distributed.server.database.AuthServer $ARGS"
echo "Running cmd : [$CMD]"
$CMD

