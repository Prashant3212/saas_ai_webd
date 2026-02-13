@echo off
attrib -R -S -H .git\index.lock
del /F /Q .git\index.lock
if exist .git\index.lock (
    echo FAIL
) else (
    echo SUCCESS
) > cleanup_status.txt
